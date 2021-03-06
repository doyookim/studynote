# 마크다운 markdown 작성법

## 1. 마크다운에 관하여
 <U>**Markdown**</U>은 텍스트 기반은 마크업업어로2004년 존그루버에 의해 만들어졌으며 쉽게 쓰고 읽을 수 있으며 HTML로 변환이 가능하다. 특수기호와 문자를 이용한 매우 간단한 구조의 문법을 사용하여 웹에서도 보다 빠르게 컨텐츠를 작성하고 보다 직관적으로 인식할 수 있다.

마크다운이 최근 각광받기 시작한 이유는 깃헙(https://github.com) 덕분이다. 깃헙의 저장소Repository에
관한 정보를 기록하는 README.md는 깃헙을 사용하는 사람이라면 누구나 가장 먼저 접하게 되는 마크다
운 문서였다. 마크다운을 통해서 설치방법, 소스코드 설명, 이슈 등을 간단하게 기록하고 가독성을 높일 수
있다는 강점이 부각되면서 점점 여러 곳으로 퍼져가게 된다.



## 2. 마크다운 사용법(문법)
### 2.1. 헤더Header

- 큰제목: 문서 제목 <font color="red"> `This is an H1 =============`</font> This is an H1 =============
- 작은제목: 문서 부제목 <font color="red">`This is an H2 -------------`</font> This is an H2 ————-
- 글머리: 1~6까지만 지원


```
# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6
```

# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6
####### This is a H7(지원하지 않음)






### 2.2. BlockQuote
이메일에서 사용하는<font color="red">` >`</font>블럭인용문자를 이용한다.

```
> This is a first blockqute.
> > This is a second blockqute.
> > > This is a third blockqute.

```
>This is a first blockqute. > This is a second blockqute. > > This is a third blockqute.

이 안에서는 다른 마크다운 요소를 포함할 수 있다. > ### This is a H3 > * List > <font color=red>`> code >`</font>

### 2.3 목록
 - **순서있는 목록(번호)**
 
    순서있는 목록은 숫자와 점을 사용한다.

```
1. 첫번째
2. 두번째
3. 세번째
```
1. 첫번째
2. 두번째
3. 세번째

 **현재까지는 어떤 번호를 입력해도 순서는 내림차순으로 정의된다.**

```
1. 첫번째
2. 두번째
3. 세번째
```
1. 첫번째
2. 두번째
3. 세번째

딱히 개선될 것 같지는 않다. 존 그루버가 신경안쓰고 있다고…


 - **순서없는 목록(글머리 기호:`  `,<font color=red>` +`</font> ,` `지원)**

```
* 빨강
    * 녹색
        * 파랑
+ 빨강
    + 녹색
        + 파랑
- 빨강
    - 녹색
        - 파랑
```

* 빨강
  * 녹색
    * 파랑
* 빨강
  * 녹색
    * 파랑
* 빨강
  * 녹색
    * 파랑

혼합해서 사용하는 것도 가능하다(내가 선호하는 방식)

```
* 1단계
    - 2단계
        + 3단계
            + 4단계

```

* 1단계
    - 2단계
        + 3단계
            + 4단계


### 2.4 코드
4개의 공백 또는 하나의 탭으로 들여쓰기를 만나면 변환되기 시작하여 들여쓰지 않은 행을 만날때까지 변환
이 계속된다.


#### 2.4.1. 들여쓰기

```
This is a normal paragraph:
    This is a code block.
end code block.
```
실제로 적용해보면,
\
적용예:
- - -
This is a normal paragraph:
```
This is a code block.
```
end code block. *****
> **한줄 띄어쓰지 않으면 인식이 제대로 안되는 문제가 발생합니다.**

```
This is a normal paragraph:
    This is a code block.
end code block.
```
적용예:
- - - 
This is a normal paragraph: This is a code block. end code block. *****

#### 2.4.1. 코드블럭
코드블럭은 다음과 같이 2가지 방식을 사용할 수 있습니다:

- <font color=red>`<pre><code>{code}</code ></pre>` </font>이용방식

```
<pre>
<code>
public class BootSpringBootApplication {
    public static void main(String[] args) {
        System.out.println("Hello, Honeymon");
    }
}
</code>
</pre>
```

```
public class BootSpringBootApplication {
    public static void main(String[] args) {
        System.out.println("Hello, Honeymon");
    }
}
```
- 코드블럭코드("```")을 이용하는 방법
```
public class BootSpringBootApplication {
    public static void main(String[] args) {
        System.out.println("Hello, Honeymon");
    }
}
```
```
public class BootSpringBootApplication {
    public static void main(String[] args) {
        System.out.println("Hello, Honeymon");
    }
}
```
**깃헙**에서는 코드블럭코드(“```”) 시작점에 사용하는 언어를 선언하여 <U>문법강조(Syntax highlighting)</U>이 가능
하다.

```java
public class BootSpringBootApplication {
    public static void main(String[] args) {
        System.out.println("Hello, Honeymon");
    }
}

```

```
public class BootSpringBootApplication { public static void main(String[] args) { System.out.print
ln("Hello, Honeymon"); }}
```

### 2.5. 수평선 <font color=red>`<hr/>`</font>
아래 줄은 모두 수평선을 만든다. 마크다운 문서를 미리보기로 출력할 때 페이지 나누기 용도로 많이 사용한
다.
```
* * *
***
*****
- - -
---------------------------------------
```

- 적용예 ***
* * *
***
*****
- - -
---------------------------

### 2.6. 링크
- 참조링크
```
[link keyword][id]
[id]: URL "Optional Title here"
// code
Link: [Google][googlelink]
[googlelink]: https://google.com "Go google"

```
Link: [Google](https://google.com)
- 외부링크
```
사용문법: [Title](link)
적용예: [Google](https://google.com, "google link")
```
Link: [Google](https://google.com)
- 자동연결
```
일반적인 URL 혹은 이메일주소인 경우 적절한 형식으로 링크를 형성한다.

* 외부링크: <http://example.com/>
* 이메일링크: <address@example.com>

```

- 외부링크: <http://example.com/>
- 이메일링크: <address@example.com>

### 2.7. 강조
```
*single asterisks*
_single underscores_
**double asterisks**
__double underscores__
~~cancelline~~
<U>underLine</U>
```
- *single asterisks*
- _single underscores_
- **double asterisks**
- __double underscores__
- ~~cancelline~~
- <U>underLine</U>

> 문장 중간에 사용할 경우에는 **띄어쓰기** 를 사용하는 것이 좋다.
문장 중간에 사용할 경우에는 띄어쓰기를 사용하는 것이 좋다.

### 2.8. 이미지

```
![Alt text](/path/to/img.jpg)
![Alt text](/path/to/img.jpg "Optional title")
```
사이즈 조절 기능은 없기 때문에<font color=red> `<img width="" height=""></img >`</font> 를 이용한다.\
예
```
<img src="/path/to/img.jpg" width="450px" height="300px" title="px(픽셀) 크기 설정" alt="RubberDuck"></im
g><br/>
<img src="/path/to/img.jpg" width="40%" height="30%" title="px(픽셀) 크기 설정" alt="RubberDuck"></img>
```

### 2.9. 줄바꿈
3칸 이상 띄어쓰기()를 하면 줄이 바뀐다.
```
* 줄 바꿈을 하기 위해서는 문장 마지막에서 3칸이상을 띄어쓰기해야 한다.
이렇게
* 줄 바꿈을 하기 위해서는 문장 마지막에서 3칸이상을 띄어쓰기해야 한다.___\\ 띄어쓰기
이렇게
```
- 줄 바꿈을 하기 위해서는 문장 마지막에서 3칸이상을 띄어쓰기해야 한다. 이렇게
- 줄 바꿈을 하기 위해서는 문장 마지막에서 3칸이상을 띄어쓰기해야 한다.   
이렇게