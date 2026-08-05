# 작업 일지

이 문서는 프로젝트의 진행 과정을 날짜순으로 기록합니다. 새로운 작업을 진행할 때마다 날짜, 진행 내용, 변경 파일, 관련 커밋을 추가합니다.

## 2026-07-27

### 개인 포트폴리오 기반 제작

- 한 페이지 형식의 개인 포트폴리오 웹사이트를 제작했습니다.
- About, Interests, Experiments, Now 영역을 구성했습니다.
- 모바일 메뉴와 반응형 화면을 구현했습니다.
- 빌드 스크립트와 OpenAI 호스팅 설정을 추가했습니다.
- 관련 커밋: `d2ea4be` (`Create personal growth portfolio foundation`)

### 흑백 비주얼 시스템 적용

- 웹사이트 색상을 흰색과 검은색 중심으로 정리했습니다.
- 관련 커밋: `951c493` (`Refine site with monochrome visual system`)

## 2026-08-05

### 사이트 구성 문서화

- 페이지별 콘텐츠와 디자인 방향을 `site-structure.txt`에 정리했습니다.
- 관련 커밋: `a16374f` (`Document portfolio site structure`)

### 작업 일지 도입

- 앞으로 프로젝트 변경 사항을 날짜별로 누적할 `WORKLOG.md`를 만들었습니다.
- 이후 작업 시 진행 내용, 변경 파일, 검증 결과, 관련 커밋을 함께 기록합니다.

### 포트폴리오 경험 영역 확장

- 학력을 국민대학교 소프트웨어학부 졸업으로 구체화했습니다.
- 경험을 연도별로 한데 묶지 않고 전공 프로젝트, 디자인, 연극의 세 영역으로 분리했습니다.
- 전공 프로젝트에 지역사회 데이터 아카이브와 탑다운 뷰 슈팅게임 경험을 추가했습니다.
- 디자인 영역에 Adobe Illustrator 포스터와 Fusion 360 모델링 경험을 추가했습니다.
- 연극 영역에 2023~2024년 연출, 무대, 배우 활동을 타임라인으로 구성했습니다.
- 데스크톱 및 모바일 반응형 레이아웃과 스크롤 등장 효과를 적용했습니다.
- 변경 파일: `test/index.html`, `test/styles.css`, `test/script.js`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과

### Q&A 페이지 추가

- 포트폴리오와 분리된 `qna.html` 페이지를 만들었습니다.
- 학력, 전공 프로젝트, 게임 프로젝트, 디자인 도구, 연극 활동, 현재 목표에 관한 6개의 질문과 답변을 구성했습니다.
- 질문을 누르면 답변이 펼쳐지는 아코디언 UI와 모바일 반응형 레이아웃을 적용했습니다.
- 메인 페이지와 Q&A 페이지의 내비게이션을 서로 연결했습니다.
- Vite 다중 페이지 빌드 설정과 호스팅 빌드 스크립트를 갱신했습니다.
- 변경 파일: `test/qna.html`, `test/vite.config.js`, `test/index.html`, `test/styles.css`, `build-sites.mjs`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과 및 `dist/public/qna.html` 생성 확인

### 실제 계정 인증 기능 기반 구현

- Supabase Auth를 이용한 이메일·비밀번호 회원가입, 로그인, 로그아웃 기능을 구현했습니다.
- 이메일 확인 안내, 비밀번호 확인, 오류 메시지, 로그인 세션 유지 및 로그인 계정 표시를 추가했습니다.
- 메인 및 Q&A 페이지에서 계정 페이지로 이동할 수 있도록 연결했습니다.
- 인증 환경 변수가 없을 때 안전하게 설정 안내를 보여주도록 처리했습니다.
- 실제 연결 값은 저장소에 노출되지 않도록 `.env` 파일을 Git에서 제외하고 `.env.example`만 추가했습니다.
- Vite 다중 페이지 빌드와 배포 결과물에 `auth.html`을 포함했습니다.
- 변경 파일: `test/auth.html`, `test/auth.js`, `test/styles.css`, `test/index.html`, `test/qna.html`, `test/vite.config.js`, `build-sites.mjs`, `.env.example`, `.gitignore`, `package.json`, `package-lock.json`, `WORKLOG.md`
- 검증: 환경 변수 미설정 및 테스트 환경 변수 설정 상태에서 `npm run build`, `git diff --check` 통과
- 남은 연결 작업: Supabase 프로젝트 URL과 Publishable Key 설정, 운영 사이트 URL 등록

### Q&A·로그인 페이지 경로 오류 수정

- 하위 경로에 배포된 사이트에서 `/qna.html`, `/auth.html`이 도메인 최상위를 요청해 `Cannot GET`이 발생하는 문제를 수정했습니다.
- 페이지, 스크립트, 내비게이션 링크를 배포 위치 기준의 상대 경로로 변경했습니다.
- Vite의 정적 에셋 경로도 상대 경로로 생성되도록 설정했습니다.
- 이메일 가입 확인 후 돌아오는 주소가 현재 배포 경로를 유지하도록 수정했습니다.
- 변경 파일: `test/index.html`, `test/qna.html`, `test/auth.html`, `test/auth.js`, `test/vite.config.js`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과 및 빌드 결과에서 최상위 고정 내부 경로가 없음을 확인

### 로그인 페이지 UI 및 메뉴 수정

- 로그인 페이지 상단에서 불필요한 Q&A와 ACCOUNT 링크를 제거하고 HOME만 유지했습니다.
- 인증 서버 연결 전에도 로그인·회원가입 탭과 입력 폼이 항상 보이도록 수정했습니다.
- 연결 전 폼 제출 시 필요한 설정을 안내하고, 연결 후에는 기존 실제 인증 로직이 그대로 작동하도록 구성했습니다.
- 현재 배포 환경에 Supabase URL과 Publishable Key가 설정되지 않은 상태임을 확인했습니다.
- 변경 파일: `test/auth.html`, `test/auth.js`, `test/styles.css`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과

### 회원가입 전용 페이지 분리

- 로그인 페이지 상단의 HOME 메뉴를 제거하고 우측 BACK HOME 링크만 유지했습니다.
- 기존에 동작하지 않던 회원가입 탭을 별도의 `signup.html` 페이지로 교체했습니다.
- 회원가입 시 이메일, 비밀번호, 비밀번호 확인, 나이, 성별, 지역 및 개인정보 수집 동의를 받도록 구성했습니다.
- 나이, 성별, 지역은 Supabase 사용자 메타데이터에 저장하도록 인증 로직을 구현했습니다.
- 로그인 페이지와 회원가입 페이지가 서로 이동할 수 있도록 연결했습니다.
- 모바일 회원가입 폼과 배포 빌드 설정을 추가했습니다.
- 변경 파일: `test/auth.html`, `test/auth.js`, `test/signup.html`, `test/signup.js`, `test/styles.css`, `test/vite.config.js`, `build-sites.mjs`, `WORKLOG.md`
- 검증: Supabase 환경 변수 미설정 및 테스트 값 설정 상태에서 `npm run build`, `git diff --check` 통과 및 `dist/public/signup.html` 생성 확인

### 회원가입 기본 정보 항목 조정

- 나이 입력을 출생년도 입력으로 변경하고 저장 필드를 `birth_year`로 수정했습니다.
- 성별 선택지에서 논바이너리를 제거했습니다.
- 변경 파일: `test/signup.html`, `test/signup.js`, `WORKLOG.md`

### 상단 내비게이션 재구성 및 이름 제거

- 메인 메뉴를 ABOUT, EXPERIENCE, NOW, Q&A와 우측 LOGIN으로 정리했습니다.
- EXPERIENCE 아래에 프로젝트, 디자인 경험, 동아리 활동으로 이동하는 하위 메뉴를 추가했습니다.
- 데스크톱의 마우스·키보드 조작과 모바일 펼침 메뉴에 대응했습니다.
- 웹페이지의 한글·영문 실명과 이름 이니셜 로고를 제거하고 `STILL.`로 교체했습니다.
- 페이지 제목, 설명, 소개 문장, 푸터 저작권 표기에서도 이름을 제거했습니다.
- 변경 파일: `test/index.html`, `test/qna.html`, `test/auth.html`, `test/signup.html`, `test/styles.css`, `WORKLOG.md`
- 검증: 웹 소스 내 이름 잔존 여부 검사, `npm run build`, `git diff --check` 통과

### EXPERIENCE 가로 슬라이드 윈도우 구현

- 분리되어 있던 프로젝트, 디자인 경험, 동아리 활동을 홈페이지의 하나의 브라우저형 윈도우에 통합했습니다.
- 상단 탭과 이전·다음 버튼으로 세 화면을 좌우 슬라이드할 수 있도록 구현했습니다.
- 모바일에서는 좌우 스와이프로도 화면을 넘길 수 있도록 터치 동작을 추가했습니다.
- 현재 화면 번호와 선택된 탭이 슬라이드에 맞춰 갱신되도록 구성했습니다.
- 상단 EXPERIENCE 하위 메뉴에서 원하는 슬라이드를 바로 열 수 있도록 연결했습니다.
- Q&A 페이지에서 특정 EXPERIENCE 항목으로 이동해도 알맞은 슬라이드가 열리도록 URL 해시를 처리했습니다.
- 변경 파일: `test/index.html`, `test/qna.html`, `test/styles.css`, `test/script.js`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과

### EXPERIENCE 캐러셀 인디케이터 적용

- 하단의 숫자 페이지 표시를 클릭 가능한 캐러셀 인디케이터 3개로 변경했습니다.
- 현재 슬라이드는 길게 채워진 인디케이터로 구분되도록 디자인했습니다.
- 각 인디케이터를 클릭하면 프로젝트, 디자인 경험, 동아리 활동 화면으로 바로 이동합니다.
- 기존 이전·다음 버튼과 모바일 스와이프 기능은 유지했습니다.
- 변경 파일: `test/index.html`, `test/styles.css`, `test/script.js`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과

### EXPERIENCE 상세 페이지 분리

- 캐러셀에서 프로젝트 세부 내용을 제거하고 카테고리 표지만 노출하도록 단순화했습니다.
- 각 슬라이드 전체를 클릭할 수 있는 링크로 만들어 해당 상세 페이지로 이동하도록 구현했습니다.
- 전공 프로젝트, 디자인 경험, 동아리 활동을 각각 `projects.html`, `design.html`, `theater.html`로 분리했습니다.
- 각 상세 페이지에 기존 경험 내용과 EXPERIENCE로 돌아가는 링크를 구성했습니다.
- 새 상세 페이지 3개가 배포 결과물에 포함되도록 Vite 및 호스팅 빌드 설정을 확장했습니다.
- 변경 파일: `test/index.html`, `test/projects.html`, `test/design.html`, `test/theater.html`, `test/styles.css`, `test/vite.config.js`, `build-sites.mjs`, `WORKLOG.md`
- 검증: `npm run build`, `git diff --check` 통과 및 세 상세 페이지와 캐러셀 링크 생성 확인

### EXPERIENCE 캐러셀 UI 간소화

- 캐러셀 상단의 PROJECTS, DESIGN, THEATER 탭 바와 페이지 수 표시를 제거했습니다.
- 하단의 PREV, NEXT 버튼을 제거하고 캐러셀 인디케이터만 중앙에 남겼습니다.
- 슬라이드의 좌측 상단 번호와 EXPERIENCE 표기, VIEW PAGE 문구를 제거했습니다.
- EXPERIENCE 소개의 탭·화살표 사용 안내 문구를 삭제했습니다.
- 슬라이드 클릭을 통한 상세 페이지 이동과 모바일 스와이프는 유지했습니다.
- 탭 제거 후에도 세 패널을 기준으로 슬라이드 순환이 작동하도록 JavaScript를 수정했습니다.
- 변경 파일: `test/index.html`, `test/styles.css`, `test/script.js`, `WORKLOG.md`
- 검증: 제거 대상 문구 검사, `npm run build`, `git diff --check` 통과
