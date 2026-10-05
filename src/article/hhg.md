---
title: 할건해야짐
period: 2025.05.16 – 05.28
role: 4인 팀 · 매출·운동기구 모듈
archive: true
summary: 헬스장 통합 관리 웹서비스(4인 팀, 2주). 첫 팀 프로젝트였고, 매출·운동기구 모듈을 맡아 트레이너별 매출을 차트로 시각화했습니다.
stack: [Java, JSP, Servlet, MVC-2, MySQL, chart.js]
links:
  repo: https://github.com/ruff1376/AI3_MINI1_TEAM3
---

<details class="shots">
<summary><span class="closed">구현 화면 7장 보기</span><span class="opened">구현 화면 접기</span></summary>

![트레이너별 매출 chart.js 시각화. 최근 1주/한 달/전체 조회.](hhg/salesChartMax.png "대표")

![좌측 트레이너 클릭으로 개별 차트 조회.](hhg/salesChartMin.png "대표")

![상태에 '점검' 키워드가 있으면 메인 할 일 탭에 노출.](hhg/machineEdit.png "대표")

![메인 화면.](hhg/main.png)

![카테고리별 기구 추가, 클릭 시 수정 화면 이동.](hhg/machines.png)

![매출 등록. 클릭 시 아코디언 탭.](hhg/salesList.png)

![매출 클릭 시 수정 화면 이동.](hhg/sales.png)

</details>

---

## 음수 매출 입력 차단

**문제** — 매출을 음수로 넣으면 차트가 깨졌습니다.
- 명세에 없는 입력으로, 직접 테스트하다 음수를 넣어 보고 알았습니다

**선택** — 뷰에서 필수값을 검증하고, 컨트롤러에서 0 미만을 예외로 처리해 에러 메시지를 띄웠습니다.

**결과** — 음수 매출은 에러 메시지와 함께 거절됩니다.

---

## 빈 데이터 상태의 NullPointerException

**문제** — 데이터가 없는 상태로 페이지에 들어가면 NPE 오류 페이지가 떠 페이지 자체가 안 열렸습니다.

**원인** — null 체크 누락이었습니다. 개발 중에는 항상 데이터가 있어 "아무것도 없는 상태"를 지나쳤습니다.
- 기구를 등록해 두고 기구 화면을 만들고, 매출을 넣어 두고 매출 화면을 만들었습니다

**한계** — 기간 안에 고치지 못한 채 제출했습니다.
