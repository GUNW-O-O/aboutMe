---
title: Resonos
period: 2025.06.26 – 08.27
role: 4인 팀 · 아티스트·트랙·앨범 도메인 풀스택 + 커뮤니티 프론트
summary: 앨범·트랙·아티스트에 리뷰와 분위기 투표를 남기는 음악 커뮤니티(4인 팀). 메인 화면 3종을 화면부터 DB까지 맡아 상호작용을 전면 비동기로 바꿨고, 이어서 REST API와 React로 전환했습니다.
stack: [Spring Boot, Thymeleaf, MyBatis, MySQL, React, YouTube API, Spotify API, Swagger, CKEditor 5, chart.js]
links:
  thymeleaf: https://github.com/ruff1376/Resonos
  react: https://github.com/Lee-0210/Resonos_React
---

React 전환에서는 Thymeleaf 버전에서 맡았던 아티스트·트랙·앨범을 백엔드와 프론트 양쪽으로 옮겼습니다. 새로 생긴 커뮤니티는 백엔드와 프론트를 나누자고 제안해 프론트를 단독으로 맡았습니다. 기존 Thymeleaf 레포를 결과물로 남기려고 별도 레포에서 전환했습니다.

<details class="shots">
<summary><span class="closed">구현 화면 23장 보기</span><span class="opened">구현 화면 접기</span></summary>

![유저 상호작용 전면 비동기 처리. 재생 중단 없음.](resonosSpring/resonosTrack.avif "대표")

![앨범 6요소 평가. 투표 기록이 있으면 수정하기로 분기.](resonosSpring/albumVote.avif "대표")

![Spotify·YouTube API 임베드 + Bandsintown 공연 일정 + 분위기 투표.](resonosSpring/artist.png "대표")

![웰컴 페이지.](resonosSpring/main.png)

![앨범 수록곡·리뷰 현황·6요소 점수·플레이리스트 표시.](resonosSpring/album.png)

![트랙을 플레이리스트에 추가하고 분위기 기반으로 다른 곡 탐색.](resonosSpring/track.png)

![분위기 투표와 트랙 포함 플레이리스트 (좋아요순).](resonosSpring/trackmood.png)

![리뷰 더보기 페이지네이션 및 블라인드 리뷰 보기.](resonosSpring/albumReview.avif)

![상호작용 내용 저장 및 좋아요 수 기준 정렬.](resonosSpring/resonosStatus.avif)

![관리자 화면. 블라인드 리뷰 즉시 열람, 전체 리뷰 수정/삭제.](resonosSpring/resonosAdmin.avif)

![유저가 원하는 항목으로 투표 등록/수정/삭제. 로그인 시 투표 가능.](resonosReact/comVote.avif "대표")

![컨트롤러 리팩토링 전/후. 파사드 패턴으로 컨트롤러·서비스 역할 분리.](resonosReact/comRefactoring.png "대표")

![비회원은 임시 비밀번호 등록 후 게시글·댓글 작성/삭제 가능.](resonosReact/comNonMember.avif "대표")

![댓글 리스트 길이에 따라 전/후 페이지를 자동 요청.](resonosReact/pagination.avif "대표")

![기본 다크모드 웰컴 페이지.](resonosReact/welcomDark.avif)

![현재 모드를 감지해 맞춤 배경을 적용. 다크/라이트 조화 개선.](resonosReact/welcomeLight.png)

![아티스트 페이지.](resonosReact/artist.avif)

![앨범 페이지.](resonosReact/album.avif)

![트랙 페이지.](resonosReact/track.avif)

![커뮤니티 메인 페이지.](resonosReact/comMain.png)

![비회원 게시글은 등록한 비밀번호가 맞으면 수정할 수 있습니다.](resonosReact/comPostEdit.avif)

![투표 기능.](resonosReact/comPost.avif)

![상호작용 버튼 저장 및 표시. 작성자는 수정/삭제 가능.](resonosReact/comComments.avif)

</details>

---

## 재생 끊김 해소를 위한 상호작용 전면 비동기 전환

**문제** — 서버 렌더링이라 리뷰 등록·좋아요 같은 상호작용마다 페이지가 통째로 새로 그려졌고, 플레이어까지 새로 로드돼 듣던 노래가 멈췄습니다.
- 기능 명세에 없던 문제로, 직접 사용 테스트를 하며 노래를 들으면서 리뷰를 쓰다가 겪었습니다
- 음악 커뮤니티에서 재생이 끊기는 건 그냥 넘길 수 없는 문제였습니다

**대안** — 하나만 비동기로 바꾸면 그 기능에서만 안 끊깁니다. 사용자에게는 여전히 끊기는 사이트라 부분 적용은 의미가 없었습니다.

**선택** — 사용자 상호작용을 전면 비동기로 바꿨습니다.
- 리뷰 등록·더보기, 6요소 분위기 투표, 아티스트 팔로우, 좋아요, 리뷰 가리기까지
- 리뷰는 서버가 Thymeleaf 조각을 렌더해 보내고 화면이 그 자리만 바꿉니다. 좋아요와 분위기 투표는 값만 받아 숫자와 차트를 다시 그립니다
- **따라온 비용**: 화면을 갱신하는 책임이 서버에서 JS로 넘어와, 목록 삽입·차트 다시 그리기·숫자 갱신을 전부 응답을 받아 직접 해야 했습니다
- **플레이어**: 임베드가 막힌 뮤직비디오가 있어 뮤직비디오가 있든 없든 Spotify 플레이어를 항상 띄워 어느 곡이든 들으며 리뷰를 쓸 수 있게 했습니다. 로그인하면 풀버전까지 재생되는 것을 확인하고 넣었습니다

**결과** — 리뷰를 쓰고, 더보기로 리뷰를 더 불러오고, 좋아요를 눌러도 재생이 이어집니다.

---

## YouTube 영상 오매칭 방지 점수 필터

<figure class="dg">
<svg viewBox="0 0 800 330" role="img" aria-label="트랙 서비스가 저장된 영상 ID를 먼저 찾고, 없으면 YouTube를 검색해 후보를 거르고 점수로 골라 DB에 저장하는 순서도">
<defs><marker id="ah6" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="ah" d="M0 0 8 4 0 8z"/></marker></defs>
<rect class="hd" x="34" y="6" width="112" height="28" rx="6"/><text class="t" x="90" y="25" text-anchor="middle">DB</text><rect class="hd" x="244" y="6" width="112" height="28" rx="6"/><text class="t" x="300" y="25" text-anchor="middle">YouTube API</text><rect class="hd" x="444" y="6" width="112" height="28" rx="6"/><text class="t" x="500" y="25" text-anchor="middle">트랙 서비스</text>
<line class="ll" x1="90" y1="34" x2="90" y2="318"/><line class="ll" x1="300" y1="34" x2="300" y2="318"/><line class="ll" x1="500" y1="34" x2="500" y2="318"/>
<line class="ar" x1="500" y1="66" x2="98" y2="66" marker-end="url(#ah6)"/><text class="" x="100" y="59">① 저장된 영상 ID 조회 · 있으면 여기서 끝</text>
<line class="ar" x1="500" y1="110" x2="308" y2="110" marker-end="url(#ah6)"/><text class="" x="310" y="103">② 조회수순 50건 검색</text>
<path class="ar" d="M500 130h26v16h-18" marker-end="url(#ah6)"/><text x="544" y="142">③ 아티스트명 없는 영상 제외</text>
<path class="ar" d="M500 170h26v16h-18" marker-end="url(#ah6)"/><text x="544" y="182">④ 제외 키워드가 있는 영상 제외</text>
<path class="ar" d="M500 210h26v16h-18" marker-end="url(#ah6)"/><text x="544" y="222">⑤ 남은 후보 점수 합산 → 최고점</text>
<line class="ar" x1="500" y1="262" x2="308" y2="262" marker-end="url(#ah6)"/><text class="fa" x="310" y="255">⑥ 후보가 없으면 다음 검색어로</text>
<line class="ar" x1="500" y1="306" x2="98" y2="306" marker-end="url(#ah6)"/><text class="ac" x="100" y="299">⑦ 영상 ID 저장 · 끝내 없으면 「없음」으로 저장</text>
</svg>
<figcaption>찾은 결과도, 못 찾았다는 결과도 저장해 같은 곡을 다시 검색하지 않습니다</figcaption>
</figure>

**문제** — YouTube API로 뮤직비디오를 찾아 영상 ID를 저장했는데, 다른 아티스트 영상이나 리액션 영상이 들어갔습니다.
- 처음에는 제외 키워드만 있었습니다. 잘 동작하는 줄 알다가 저장된 데이터를 보니, 제목만 같고 주제가 다른 영상, 다른 영상과 합쳐진 영상이 들어 있었습니다

**선택** — 검색 결과를 그대로 믿지 않고, 후보를 거른 뒤 점수로 줄 세워 최고점을 고릅니다.
- **거르기**: 영상 제목과 채널명 어디에도 아티스트명이 없으면 제외합니다(공식 채널은 통과). 리액션·커버·직캠 같은 제외 키워드가 제목에 있어도 제외합니다
- **점수**: 공식 채널 +15, 제목의 MV 표기 +5, 아티스트명 +3, 곡 제목 +2, 둘 다 있으면 +2
- **검색어**: 「아티스트 - 제목 mv」로 먼저 찾고, 후보가 없으면 제목에서 영문·한글·일문만 뽑은 검색어, 아티스트명, 제목 순으로 다시 찾습니다. 제목의 feat. 뒤는 지우고 검색합니다
- **저장**: YouTube API에는 일일 쿼터가 있어 같은 곡을 볼 때마다 검색하면 언젠가 막힙니다. 한 번 찾은 결과는 DB에서 읽습니다
- 제외·공식 채널 키워드 목록은 AI로 생성·보강했습니다

**결과** — 잘못 고르더라도 같은 음원이거나 다른 언어 번역 영상에 그칩니다.

**한계** — 무료 쿼터 제한 때문에 테스트를 넉넉히 돌리지 못해 필터링 로직을 충분히 다듬지 못했습니다.

<details class="more">
<summary>나머지 항목</summary>

## REST 전환 시 화면 조립 로직의 파사드 분리

**문제** — 컨트롤러에 간단한 로직이 조금씩 쌓여 서비스 계층과 구분이 안 되는 상태였습니다.
- 서버 렌더링에서는 한 화면이 한 컨트롤러 메서드라, 앨범 목록·리뷰 현황·투표 결과·팔로우 상태를 모아 모델에 담는 조립 로직이 컨트롤러에 있어도 티가 나지 않았습니다
- REST로 쪼개는 순간 그 조립 로직을 어디에 둘지 정해야 했습니다

**선택** — 초기 페이지 조회를 `Combined*Service`(파사드) 뒤로 옮기고, 컨트롤러에는 파라미터 주입과 위임 한 줄만 남겼습니다.
- 화면 하나에 필요한 조합을 서버가 알게 했습니다. 조립을 프론트로 넘기면 왕복이 늘고, 어떤 조합이 한 화면인지라는 지식이 프론트에만 남습니다
- 컨트롤러에는 HTTP 처리만 남고 화면 조립은 서비스로 갔습니다
- **응답 계약**: `Map` 대신 명시적 `PageDTO`로 바꿨습니다. Map은 키가 어디에도 문서화되지 않아, 프론트는 응답을 찍어 봐야 알고 백엔드는 키를 바꿔도 컴파일이 통과합니다

**결과** — 트랙 번호나 앨범 번호가 컨트롤러로 들어오면 나머지 처리는 모두 서비스가 맡습니다.
- 리뷰 도메인은 백엔드와 프론트 양쪽을 전환했습니다

---

## 백엔드·프론트 분업 후 응답 누락 대응

**문제** — 백/프론트가 갈리자 응답에 프론트 렌더에 필요한 값이 빠져 백엔드를 다시 고치는 일이 반복됐습니다.
- 서버 렌더링일 때는 화면과 데이터가 한 사람 머릿속에 있었습니다

**선택** — 팀이 도입한 Swagger 명세로 원인이 백엔드인지 프론트인지부터 가르고, 필요한 값을 사전에 논의하는 절차를 팀에 제안했습니다.
- 제가 맡은 응답은 DTO로 정해 계약으로 삼았습니다

---

## React 전환 후 렌더 시점 불일치 대응

**문제** — 서버가 다 그려서 보내던 Thymeleaf에서는 없던 문제가 React로 옮기자 두 곳에서 나왔습니다. 둘 다 화면이 그려지는 시점과 그 화면에 필요한 것이 준비되는 시점이 달라서였습니다.
- 데이터가 오기 전에 화면을 그리려다 깨졌습니다
- Bandsintown 공연 일정 위젯이 나오지 않았습니다. 위젯 스크립트는 로드될 때 한 번만 DOM을 훑는데, 그때 대상 요소가 아직 없었습니다

**선택** — 데이터가 온 뒤에 그리고, 요소가 생긴 뒤에 다시 훑게 했습니다.
- **데이터**: `isLoading` 상태로 로딩 전 렌더를 막았습니다
- **위젯**: `useEffect`에서 스크립트를 동적으로 넣고 로드가 끝나면 `init()`으로 다시 훑게 했고, 이미 로드돼 있으면 `init()`만 다시 부릅니다

---

## 댓글 추가 시 페이지 경계 처리

**문제** — 댓글을 쓰면 `useState`로 리스트에 추가해 페이지 경계를 무시하고 계속 쌓였습니다.

**선택** — 등록에 성공하면 현재 페이지가 가득 찼는지(10개) 확인해, 찼으면 다음 페이지를 요청해 이동하고 아니면 목록에 추가했습니다.

</details>
