# Big todos

1. 법률 넣기
    0. 정보공개청구법 : 
    1. 국가 공무원법 : 법률 찾아가면서 기출로 체크하기
    2. 지방자치법
2. 이유 명기하기
    -> 최후위, 진지하게 공부할거면 종이로 하는 게 맞다.

killer.js에 클릭하여 이동 넣기

click을 document에 넣지 말고, background에 제대로 넣자. 

-> 현재 문제
    : document에 하지 않으니, 마진을 클릭하면 넘어가지지가 않음. 
    : stop bubbling을 해야하 지 않을까 싶음. 자꾸 popup창을 닫으면서 클릭이 된다. 이게 정 싫다면 투명한 background를 만들어서 해결하는 게 정답이기는 하다. Timeout보다는 이게 정당한 방법이다. 

# Todos

0. 다크 모드 호환 css 변수 설정하기 주로 border color 때문
    -> 현재로서는 다크 모드에 최적화되어 있음.
    -> media="(prefers-color-scheme: dark) 를 활용하여 제대로된 호환성 챙기기
    [제대로 된 다크모드 이미지 인버트 방법](https://stackoverflow.com/questions/74638826/alternate-images-based-on-users-color-preference-without-using-javascript)
0. Popup 로직 모던화하기
    -> 현재로서는 윈도우에 엮어 있는데, 이렇게 할 게 아니라, 투명 디스플레이를 만들어서 거기에 이벤트 트리거를 넣는게 좀 더 모던하고 UX 친화적이다. 
    --> 다만 현실적으로 중요도가 크지는 않다. 약간의 퍼포먼스 로스트가 있는데, 지금 시간을 너무 많이 썼다... 지금은 공부하자.
1. 이유 명기하기 : 천천히 하자... 오래 걸리겠네
0. 이유 팝업에 정다보 같이 표기하자. 껏다켰다 하기에는 너무 귀찮다.
2. 그래프가 많이 필요한데, 데스모스는 너무 느리고, 리눅스판에서 계속 잉크스케이프가 튕긴다 개시발.

# MISC

설명 안에 다음 태그를 넣어 이미지 첨부 

```
<img class='exp-demo' src='svgs/desmos-graph.svg' alt='그래프'>
```
