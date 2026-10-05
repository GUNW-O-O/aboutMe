---
title: Lexi-hub
period: 2025.09.01 – 09.15
role: 개인 · 단독 개발
archive: true
summary: 커스텀 단어장을 타이핑으로 외우는 학습 서비스. 프론트·백엔드·Flutter를 혼자 만들었고, 한글 조합 중인 글자를 오타로 판정하던 문제를 판정 시점을 바꿔 풀었습니다.
stack: [React, TypeScript, FSD, NestJS, MongoDB, JWT, Flutter]
links:
  frontend: https://github.com/GUNW-O-O/lexi-hub
  backend: https://github.com/GUNW-O-O/lexi-hub-backend
  flutter: https://github.com/GUNW-O-O/lexi-hub-flutter
---

팀 프로젝트에서 못 해 본 것(TypeScript, 인증/인가, NoSQL 모델링)을 골라 넣은 학습용 프로젝트입니다.

<details class="shots">
<summary><span class="closed">구현 화면 9장 보기</span><span class="opened">구현 화면 접기</span></summary>

![단어장 타이핑 화면. 받침 입력 중에는 오타 판정을 유예합니다.](lexiHub/typingFlashcard.gif "대표")

![단일 추가와 JSON/CSV 대량 추가를 지원합니다.](lexiHub/addFlashcard.gif "대표")

![메인 사이드바에서 단어장 목록 검색.](lexiHub/mainSearch.gif "대표")

![단어 수정/삭제는 하단 버튼으로 최종 확정되는 구조.](lexiHub/editFlashcard.png)

![단어장 정보 화면.](lexiHub/editedFlashcard.png)

![장문 등록 화면.](lexiHub/addLongform.png)

![장문 정보 페이지에서 페이지 이동 없이 수정.](lexiHub/EditLongform.gif)

![장문 타이핑 화면.](lexiHub/typingLongform.gif)

![장문 타이핑 완료 화면.](lexiHub/doneLongform.png)

</details>

---

## 한글 조합 중 글자의 오타 판정 유예

**문제** — 한글은 한 글자가 여러 번에 걸쳐 만들어져 글자 단위로 비교하면 조합 중인 글자가 오타로 찍혔습니다.
- "간"을 치면 `ㄱ` → `가` → `간` 순으로 값이 바뀝니다. 앞의 둘은 틀린 글자가 아니라 아직 안 끝난 글자입니다
- 정확히 친 사람도 입력하는 내내 빨간 글자를 보게 됩니다
- typing.works를 레퍼런스로 두고 비슷하게 구현하다가 직접 타이핑하며 겪었습니다

**선택** — 입력 중인 글자는 판정을 미루고, 다음 글자가 들어오는 시점에 이전 글자를 최종 판정합니다.
- 다음 글자가 들어왔다는 건 앞 글자의 조합이 끝났다는 뜻이라 입력 순서만으로 판정할 수 있습니다
- 마지막 글자는 색으로 판정하지 않고, Enter를 누를 때 입력 전체를 정답과 비교합니다
- 먼저 화면에 그릴 글자 상태를 입력됨 / 대기 / 오타 셋으로 나눴고, 그 과정에서 이 규칙에 도달했습니다

**결과** — 정확히 치는 동안에는 빨간 글자가 나오지 않습니다.

<details class="more">
<summary>나머지 항목</summary>

## 토큰 분리 저장과 자동 재발급

**문제** — JWT가 만료되면 인증 오류가 나서 한 페이지에 오래 머문 사용자에게 재로그인을 요구했습니다.

**선택** — Access Token은 응답 본문으로, Refresh Token은 HttpOnly 쿠키(7일)로 나눴습니다.
- 401이 나면 `/auth/refresh-token`에서 둘 다 재발급하는 인터셉터를 뒀습니다

---

## 일괄 추가 시 마지막 항목만 반영되던 결함 수정

**문제** — JSON/CSV로 단어를 일괄 추가하면 마지막 단어 하나만 목록에 들어갔습니다.

**원인** — 단건 추가를 전제로 만든 함수에 배열이 들어오고 있었습니다.

**선택** — 인자 타입에 `FlashCard[]`를 추가하고, 배열이면 펼쳐서 추가하도록 분기했습니다.

</details>
