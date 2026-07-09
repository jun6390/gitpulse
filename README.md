# GitPulse

GitHub 사용자의 프로필, 저장소, 사용 언어, 공개 활동, 인기 사용자 랭킹을 한곳에서 확인할 수 있는 개발자 인사이트 대시보드

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Zustand
- Chart.js, react-chartjs-2
- GitHub REST API

## 프로젝트 구조

```text
src
├─ app
│  ├─ api/github        # GitHub API 프록시 라우트
│  ├─ activity          # 활동 분석 페이지
│  ├─ language          # 언어 분석 페이지
│  ├─ profile           # 프로필 분석 페이지
│  ├─ ranking           # 랭킹 페이지
│  └─ repository        # 저장소 검색 페이지
├─ common               # 공통 UI/모션 컴포넌트
├─ components           # 레이아웃 및 홈 화면 컴포넌트
├─ constants            # 다국어 문구
├─ features             # 도메인별 기능 모듈
├─ stores               # 클라이언트 상태 저장소
└─ types                # GitHub API 타입 정의
```
