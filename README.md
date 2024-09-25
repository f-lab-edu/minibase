# Minibase project

## Project Setup

### 1. Minibase CLI

The text-based interface to Minibase can be invoked by using the command minibase, which has the following command-line options:

-d database name (required)
-s size of the DB in pages
-b size of the buffer pool in pages
-r reopen mode; used to reopen an existing database

example:

```
npm start -- -d test_db -s 100 -b 100 -r
```

## Code Conventions

### 1. File Naming

- 기본적으로 kebab-case를 사용합니다.
- 추상 클래스는 .abstract.ts을 사용해 속성을 구분합니다.

### 2. Class Naming

- 기본적으로 PascalCase를 사용합니다.
- 인터페이스는 I를 붙여 구분합니다.
- 추상 클래스는 II\_를 붙여 구분합니다.
- private, protected 멤버 변수는 앞에 m을 붙이고 PascalCase를 사용합니다.

### 3. Variable Naming

- 기본적으로 camelCase를 사용합니다.
- 시스템 환경 변수는 SCREAMING_SNAKE_CASE를 사용합니다.
