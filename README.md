# 🛠 _Refactoring of 🚢Ship_Identification using Redux_

Redux를 이용해 Ship_Identification의 상태 관리 구조를 효율적으로 변경하기.

올 것이 왔다.. 매일 야근하게 생겼다.

<br>

## 🔑 _Branch Key_

<br>

1. StyleSheet Modularity 

2. Establishing State Structure and reEstablishing File Structure

3. Coding Redux and Connect

4. Class Component -> Function Component

<br>

### 🗂 **StyleSheet Modularity**

<br>

컴포넌트에 적용된 스타일시트들을 모듈화시켜서 코드의 가독성을 향상시킨다.

<br>

### 🧾 **Establishing State Structure and reEstablishing File Structure**

<br>

Redux를 이용해 상태관리를 어떻게 이용할 것이고 효율적인 구조에 대해 생각해본다.

<br>

### 💻 **Coding Redux and Connect**

<br>

Redux의 기본 틀을 잡고, 하나하나 리팩토링을 하며 Store에 Connect하여 컴포넌트들을 연결시켜준다.

매우 화가 나는 작업이다.

<br>

### 📲 **Class Component -> Function Component**

<br>

기존에 사용되었던 Class형 컴포넌트에서 함수형 컴포넌트로 바꿔주어 코드의 가독성과 효울적인 모듈화를

진행시킨다. 이것도 매우 화가 나는 노가다 작업이다. 굳이 안해도 되긴 했는데.. 

맘에 안들어서 시작하였다.

<br>

### **Conclusion**

<br>

먼저 Redux 자체도 제대로 익히지 않은 채 연습하는 듯이, 코드의 구조를 생각하지 않고 바로바로

작성한 탓에 중간에 구조가 계속 바뀌기도 하였다. 미리 구조를 계획하지 않고 짰던 것이 부족하였던 

것 같다.

<br>

그 중 제일 난해했고, 고민이었던 부분이 redux-thunk를 이용해 컴포넌트와 아예 분리하여 Action 내에서

백엔드의 API 호출을 하여 결과를 처리하여 보낼 지, 아니면 해당 컴포넌트에서 API를 호출하여 

그냥 창고형 변수 느낌으로 사용할 지 매우 고민이 되었었다. 그렇다고 완전히 전자의 방법을 채택하면

Redux의 역할이 애매모호해질 거 같았고, 후자를 채택한다고 하면 Redux를 굳이 사용 안해도 되는 거 

같기도 하면서 코드를 작성하면서 매우 애를 먹었다. 이런 부분도 앱이 어떤 방식과 기능으로 구동되는 지

를 파악하고 구조를 짜는게 중요할 것 같다고 느꼈다. 이 부분도 마찬가지로 계획하지 않고 짰던 것이

코드를 작성하면서 계속해서 멈추게 되었던 요인 중 하나였다.

<br>

코드를 작성하다가 생각하던 구조랑 앱이 지향하는 방향이랑 달라서, 라이브러리의 본래 역할의 애매모호함과

앱 구조의 불명확함이 계속해서 코드를 작성하는 도중 고민하게 되고 멈추게 되는 경우가 종종 있었는데,

이럴 때마다 집중도 흐려지고 자꾸만 길이 새고 애매한 코드를 짜게 되는 거 같아서 이런 부분에서 많이

반성해야겠다고 느꼈다. 앞으로도 계속해서 리팩토링 작업을 진행할 것이지만, 추후 다른 앱을 개발할 때

에는 이런 부분에서 명확하게 짚고 fix시키고 진행해야겠다는 생각이 많이 들었다.

