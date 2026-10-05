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

오프라인 홀덤 대회의 좌석 예약, 게임 진행, 탈락과 정산을 처리하는 실시간 서버입니다. 카드 배분과 승자 결정만 오프라인에서 합니다.

동작하는 MVP까지 갔고, 거기서 멈추기로 했습니다. 검증은 크롬 창 네 개를 띄워 직접 눌러 보는 수동 확인이었습니다. Redis 영속화는 옵션만 켜 두고 되살리는 코드는 만들지 않았습니다. V2에서 코드를 전부 다시 읽자 정상 입력에서만 맞는 곳이 드러났습니다(음수 레이즈, 락 없는 읽기·쓰기, 사이드팟 칩 소실, 상금 미지급). 후속은 [Playsync V2](./playsync-v2.md)입니다.

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
<svg viewBox="0 0 760 342" role="img" aria-label="핸드 시작과 액션은 Redis 스냅샷만 읽고 쓰고, 승자가 정해진 뒤에만 PostgreSQL에 탈락과 최종 칩을 적는 순서도">
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
<line class="ar" x1="270" y1="264" x2="652" y2="264" marker-end="url(#ah5)"/><text class="ac" x="280" y="257">④ 탈락 처리 · 최종 칩 저장</text>
<line class="ar" x1="270" y1="308" x2="462" y2="308" marker-end="url(#ah5)"/><text class="" x="280" y="301">⑤ 정산된 스냅샷 저장</text>
</svg>
<figcaption>핸드가 진행되는 동안 서버는 Redis만 읽고 씁니다</figcaption>
</figure>

**문제** — 핸드 하나가 진행되는 동안 상태가 계속 바뀌는데, 해 오던 CRUD 방식대로면 그 변경이 전부 DB 쓰기가 됩니다.
- 베팅 라운드가 넷이고 라운드마다 사람 수만큼 액션이 들어가 핸드가 끝날 때까지 각자의 칩, 판돈, 차례가 계속 바뀝니다

**선택** — 진행 중인 상태는 Redis, 끝난 결과는 PostgreSQL로 역할을 갈랐습니다. 서버는 게임 로직과 통신만 맡습니다.
- **관점을 바꾼 지점**: 어떻게 빨리 쓸지보다 이 데이터가 지금 DB에 있어야 하는지를 먼저 물었습니다. 핸드 중간 상태는 나중에 조회할 일이 없습니다
- DB 트랜잭션은 정산과 탈락처럼 결과가 확정되는 순간에만 실행합니다
- **블라인드 레벨**: 서버 타이머를 두지 않고 핸드 시작 시점에 계산합니다(Lazy Update). 증가 연산이 아니라 레벨 인덱스 기준이라 여러 테이블이 동시에 확인해도 두 번 오르지 않습니다

**결과** — 핸드가 진행되는 동안에는 DB에 쓰지 않고, 정산 시점에 1~2회만 씁니다.

<details class="more">
<summary>나머지 항목</summary>

## 리바인 응답의 개별 즉시 반영

**문제** — 핸드가 끝나면 칩이 0이 된 사람들에게 리바인 의사를 묻고 각 최대 15초를 기다리는데, 먼저 답한 사람도 전체 응답이 끝날 때까지 자기 칩 갱신을 보지 못했습니다.

**선택** — 플레이어별 응답을 15초 타이머와 경쟁시켜 어느 쪽이 먼저 오든 한 번만 처리되게 했습니다.
- 응답 이벤트는 EventEmitter `once`로 기다립니다
- 한 사람의 리바인이 성공하면 바로 테이블 상태를 웹소켓으로 알립니다

**결과** — 전체 응답이 끝나기 전에도 답한 사람은 바로 결과를 봅니다.
- **같이 잡은 것**: 리바인 처리가 이미 칩을 더했는데 게임 엔진이 한 번 더 더하던 것을 고쳤습니다
- 리바인은 REST 요청이라 요청한 사람만 결과를 받고 테이블에는 알려지지 않았습니다. 요청과 응답을 웹소켓으로 옮겼습니다

---

## 반복 조회(N+1) 제거와 탈락 일괄 처리

**문제** — 리바인·탈락 흐름에서 반복문이 플레이어를 한 건씩 조회하고 UPDATE했습니다.
- 여러 명이 한 핸드에 같이 탈락하면 트랜잭션이 사람 수만큼 따로 열렸습니다
- 비효율을 발견하고 조사하다 N+1 패턴임을 알았습니다

**선택** — 대회 정보는 반복문 밖에서 한 번만 조회해 넘기고, 탈락 확정자는 한 트랜잭션에서 일괄 처리했습니다.
- IN절 `updateMany`/`deleteMany`로 묶었습니다

**결과** — 반복 읽기가 사라졌습니다. 한 핸드에 함께 탈락한 사람들이 반복 순서대로 서로 다른 등수를 받던 것도 같은 등수로 기록됩니다.

</details>
