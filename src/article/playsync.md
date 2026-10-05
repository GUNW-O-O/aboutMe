---
title: Playsync (V1)
period: 2026.02.24 – 03.15
role: 개인 · 단독 개발
summary: 오프라인 홀덤 대회의 좌석·게임 진행·정산을 처리하는 실시간 서버 MVP. 진행 중 상태는 Redis, 확정 결과는 DB로 나눠 핸드 진행 중 DB 쓰기를 0회로 만들었습니다.
stack: [NestJS, WebSocket, Next.js, Redis, PostgreSQL, Prisma, BullMQ, Docker, JWT]
links:
  repo: https://github.com/GUNW-O-O/playsync
  v2: https://github.com/GUNW-O-O/playsync-V2
---

오프라인 홀덤 대회의 좌석 예약, 게임 진행, 탈락과 정산을 처리하는 실시간 서버입니다. 카드 배분과 승자 결정만 오프라인에서 합니다. 설계부터 구현까지 혼자 했습니다.

동작하는 MVP까지 갔고, 거기서 멈추기로 했습니다. 검증은 크롬 창 네 개를 띄워 직접 눌러 보는 수동 확인이었고, V2의 전체 코드 리뷰에서 정상 입력에서만 맞던 기능들(음수 레이즈, 락 없는 읽기·쓰기, 사이드팟 칩 소실, 상금 미지급)과 되살리는 코드가 없던 Redis 영속화가 드러났습니다. 후속은 [Playsync V2](./playsync-v2.md)입니다.

<details class="shots">
<summary><span class="closed">구현 화면 8장 보기</span><span class="opened">구현 화면 접기</span></summary>

![복수 올인으로 사이드팟이 생성되는 상황. 콜 금액 변화에 따라 액션이 이어집니다.](playsync/5sidePotShowdown.gif "대표")

![첫 레이즈 이후 더 큰 벳이 나오면 새로운 액션 기회가 부여됩니다.](playsync/3raiseAndRaise.gif "대표")

![30초 내 액션이 없고 콜 금액이 없으면 자동 체크 처리됩니다.](playsync/4autoCheck.gif "대표")

![승자 결정 시 상태 수정 → 잔액 0 플레이어 탈락 처리 → 상태 기준 DB 업데이트.](playsync/8eliminated.gif "대표")

![모든 플레이어가 웹소켓으로 접속한 대기 화면.](playsync/1playersReady.png)

![관리 페이지에서 대회 시작 시 대회 정보를 Redis에 적재.](playsync/2dashboard.png)

![딜러 콘솔에서 클릭한 순서가 핸드 강한 순.](playsync/6sidePot.png)

![액션 가능 플레이어가 없으면 쇼다운 페이즈로 진입.](playsync/7goToShowDown.gif)

</details>

---

## 진행 중 상태와 확정 결과의 저장소 분리

<figure class="dg">
<svg viewBox="0 0 760 342" role="img" aria-label="핸드 시작과 액션은 Redis 스냅샷만 읽고 쓰고, 승자가 정해진 뒤에만 PostgreSQL에 탈락과 최종 스택을 적는 순서도">
<defs><marker id="ah5" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="ah" d="M0 0 8 4 0 8z"/></marker></defs>
<rect class="hd" x="24" y="6" width="112" height="28" rx="6"/><text class="t" x="80" y="25" text-anchor="middle">딜러 · 플레이어</text><rect class="hd" x="214" y="6" width="112" height="28" rx="6"/><text class="t" x="270" y="25" text-anchor="middle">서버</text><rect class="hd" x="414" y="6" width="112" height="28" rx="6"/><text class="t" x="470" y="25" text-anchor="middle">Redis</text><rect class="hd" x="604" y="6" width="112" height="28" rx="6"/><text class="t" x="660" y="25" text-anchor="middle">PostgreSQL</text>
<line class="ll" x1="80" y1="34" x2="80" y2="330"/><line class="ll" x1="270" y1="34" x2="270" y2="330"/><line class="ll" x1="470" y1="34" x2="470" y2="330"/><line class="ll" x1="660" y1="34" x2="660" y2="330"/>
<line class="ar" x1="80" y1="66" x2="262" y2="66" marker-end="url(#ah5)"/><text class="" x="90" y="59">① 핸드 시작</text>
<line class="ar" x1="270" y1="96" x2="462" y2="96" marker-end="url(#ah5)"/><text class="" x="280" y="89">블라인드 레벨 확인 · 스냅샷 저장</text>
<line class="ar" x1="80" y1="140" x2="262" y2="140" marker-end="url(#ah5)"/><text class="" x="90" y="133">② 액션</text>
<line class="ar" x1="270" y1="170" x2="462" y2="170" marker-end="url(#ah5)"/><text class="" x="280" y="163">스냅샷 읽기 → 적용 → 저장</text>
<text class="fa" x="280" y="190">베팅이 끝날 때까지 ② 반복</text>
<text class="ac" x="484" y="130">여기까지 DB 쓰기 0회</text>
<line class="ar" x1="80" y1="234" x2="262" y2="234" marker-end="url(#ah5)"/><text class="" x="90" y="227">③ 승자 입력</text>
<line class="ar" x1="270" y1="264" x2="652" y2="264" marker-end="url(#ah5)"/><text class="ac" x="280" y="257">④ 탈락 처리 · 최종 스택 저장</text>
<line class="ar" x1="270" y1="308" x2="462" y2="308" marker-end="url(#ah5)"/><text class="" x="280" y="301">⑤ 정산된 스냅샷 저장</text>
</svg>
<figcaption>핸드가 진행되는 동안 서버는 Redis만 읽고 씁니다. DB는 승자가 정해진 뒤 탈락과 최종 스택을 적을 때만 씁니다</figcaption>
</figure>

**문제** — 6인 테이블 기준 한 핸드에만 상태가 최소 7회 바뀝니다.
- 베팅 라운드가 넷이고 라운드마다 사람마다 액션이 들어가 핸드가 끝날 때까지 스택·팟·차례·베팅라인이 계속 바뀝니다
- 이때까지 해 온 CRUD 방식대로면 이 변경이 전부 DB 쓰기가 되고, 부하와 비용이 그대로 늘어납니다

**선택** — 진행 중인 상태는 Redis, 끝난 결과는 PostgreSQL로 역할을 갈랐습니다. 서버는 게임 로직과 통신만 맡습니다.
- **관점을 바꾼 지점**: 어떻게 빨리 쓸지가 아니라 이 데이터가 지금 DB에 있어야 하는지를 먼저 물었습니다. 핸드 중간 상태는 나중에 조회할 일이 없습니다
- DB 트랜잭션은 정산·탈락처럼 되돌릴 수 없는 경계 이벤트에서만 실행합니다
- **블라인드 레벨**: 서버 타이머를 없애고 핸드 시작 시점에 계산하게 했습니다(Lazy Update). 증가 연산이 아니라 레벨 인덱스 기준이라 여러 테이블이 동시에 확인해도 두 번 오르지 않습니다

**결과** — 핸드 진행 중 DB 쓰기 0회. DB에는 정산 시점에 1~2회만 씁니다.
- **구분을 남긴 곳**: Redis를 쓸 곳과 DB에 커밋할 시점의 구분을 에이전트 지침에 적었습니다

<details class="more">
<summary>전체 항목 보기</summary>

## 리바인 응답의 개별 즉시 반영

**문제** — 핸드가 끝나면 칩이 0이 된 사람들에게 리바인 의사를 묻고 각 최대 15초를 기다리는데, 먼저 답한 사람도 전체 응답이 끝날 때까지 자기 스택 갱신을 보지 못했습니다.

**선택** — 유저별 응답을 15초 타이머와 경쟁시켜 어느 쪽이 먼저 오든 한 번만 처리되게 했습니다.
- 응답 이벤트는 EventEmitter `once`로 기다립니다
- 같은 테이블 객체를 콜백 인자로 공유해 개별 응답 트랜잭션이 성공하는 즉시 상태를 고치고 웹소켓으로 알립니다

**결과** — 전체 응답이 끝나기 전에도 답한 사람은 바로 결과를 봅니다.
- **같이 잡은 것**: 리바인 처리와 게임 엔진이 같은 플레이어 객체를 공유해 스택이 두 번 더해지던 것을 고쳤습니다
- 리바인이 처리돼도 웹소켓 전파가 없어 아무도 알 수 없던 것에 전파 로직을 넣었습니다

---

## 반복 조회(N+1) 제거와 탈락 일괄 처리

**문제** — 리바인·탈락 흐름에서 반복문이 플레이어를 한 건씩 조회하고 UPDATE했습니다.
- 비효율을 발견하고 조사하다 N+1 패턴임을 알았습니다

**선택** — 공통 정보는 상위에서 한 번 조회해 넘기고, 탈락 확정자는 한 트랜잭션에서 일괄 처리했습니다.
- IN절 `updateMany`/`deleteMany`로 묶었습니다

**결과** — 반복 읽기가 사라졌고, 여러 명이 동시에 탈락할 때 등수도 어긋나지 않게 됐습니다.

---

## 도입 전 GraphQL 철거

**선택** — 라이브러리를 깔고 코드까지 쓰다가, 이 규모에는 과하다고 보고 실제로 쓰기 전에 전부 걷어냈습니다.
- 도입 비용을 이미 낸 상태에서도 되돌리는 쪽이 계속 안고 가는 것보다 싸다고 봤습니다

</details>
