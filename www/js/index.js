/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
"user strict";

/*
 * 1. 게임에 사용할 카드 이미지 배열 선언
 * 2. 카드정보( 위치, 이미지, 맞췄는지 등 )를 나타낼 Card객체 선언
 * 3. 필요 변수 선언
 * 4. 게임초기화( 카드리스트를 만들고, 랜덤하게 순서섞기 )
 * 5. 카드 클릭 시 카드 뒤집기
 * 6. 클릭 한 카드가 2개가 되면 뒤집힌 카드비교
 * 7. 같은 카드면 제거하면서 성공한 count값 1증가, 아니면 다시 원위치
 * 8. count값이 카드쌍과 동일하면 완료를 알림 
 */ 

/* 1. 게임에 사용할 카드 이미지 배열 선언  */

alert('카드게임을 시작합니다ㅎㅎㅎ못깨면 바~보');

var imageList = [ "./image/01.png",   //  1 번째 카드, 0 번째 배열
                  "./image/02.png",   //  2 번째 카드, 1 번째 배열
                  "./image/03.png",   //  3 번째 카드, 2 번째 배열
                  "./image/04.png",   //  4 번째 카드, 3 번째 배열
                  "./image/05.png",   //  5 번째 카드, 4 번째 배열
                  "./image/06.png",   //  6 번째 카드, 5 번째 배열
                  "./image/07.png",   //  7 번째 카드, 6 번째 배열
                  "./image/08.png",   //  8 번째 카드, 7 번째 배열
                  "./image/09.png",   //  9 번째 카드, 8 번째 배열
                  "./image/10.png",   // 10 번째 카드, 9 번째 배열
                  "./image/11.png",   // 11 번째 카드, 10번째 배열
                  "./image/12.png",   // 12 번째 카드, 11번째 배열

                  "./image/01.png",   //  1 번째 카드, 12번째 배열
                  "./image/02.png",   //  2 번째 카드, 13번째 배열
                  "./image/03.png",   //  3 번째 카드, 14번째 배열
                  "./image/04.png",   //  4 번째 카드, 15번째 배열
                  "./image/05.png",   //  5 번째 카드, 16번째 배열
                  "./image/06.png",   //  6 번째 카드, 17번째 배열
                  "./image/07.png",   //  7 번째 카드, 18번째 배열
                  "./image/08.png",   //  8 번째 카드, 19번째 배열
                  "./image/09.png",   //  9 번째 카드, 20번째 배열
                  "./image/10.png",   // 10 번째 카드, 21번째 배열
                  "./image/11.png",   // 11 번째 카드, 22번째 배열
                  "./image/12.png"    // 12 번째 카드, 23번째 배열
                  ];

/* 카드를 어떻게 배치할지 정보. (이 값을 바꾸면 카드가 섞이게 됨) */
var cardList = [];
var waitTime = 0;

///////////////////////////////////////////////////////////////////////////////
/* 2. 카드정보( 번호, 이미지, 맞췄는지 여부 )를 나타낼 Card객체 선언
 *  cardListIndex: cardList의 배열 index (0 ~ 23까지 있고, imageList 배열의 index(첨자) 역할을 함)
 *  cardListValue: 이 값의 차이가 12라면 같은 그림이라는 의미. 같은 그림인지 확인용 변수.
 *  id: div의 id (이 카드가 24개의 카드 중에 어떤 div id와 연결되어 있는지 알려줌)
 *  hiddenImage: 숨겨진 진짜 그림
 *  coverImage: 진짜 그림을 숨기기 위해 덥고 있는 그림.
 *  isClicked: 이 그림을 클릭했는지 여부
 *  same: 그림 짝을 맞춘 그림인지 여부
 */
function Card(id, hiddenImage) {
  this.id = Number(id.substring(6, 4)) - 1;
  this.cardListIndex = this.id;
  this.cardListValue = cardList[this.id];
  this.hiddenImage = hiddenImage;
  this.coverImage = '00.jpg';
  this.isClicked = false;
  this.same = false;

  // 24개의 div에 대한 click 이벤트를 처리할 함수
  this.addListener = function() {

    // 마우스 클릭 3번째는 처음부터 다시 시작을 의미.
    g_countClick++;
    waitTime++;

    if (g_countClick >= 3) {
      g_countClick = 1;
      g_openCardList = [];
    }
    
    setTimeout(function () {
        // 이 검사를 하지 않으면, 짝이 맞은 그림을 클릭할 때, 커버 그림이 보여지는 버그 발생.
    	console.log('aaaaa', g_countClick);
        if (waitTime > 0) {
        	g_countClick =0;
        	waitTime = 0;
        }
      }, 1500);


    // 클릭한 카드의 index 번호 구하기
    var cardListIndex = Number(this.id.substring(6, 4)) - 1;

    // 그림 맞췄으면 배경그림 안바꿈
    if( imageCard[cardListIndex].same == true ) {
      console.log('image card is same!!');
      return;
    }


    // 그림 2개를 클릭했으면 리턴
    if(g_openCardList.length == 2) {
      console.log('여긴 어디? 난 누구?');
      return;
    }

    // 클릭된 카드가 아니면 오픈.
    if( cardValidation(cardListIndex, imageCard[cardListIndex].cardListValue) ) {
      drawOpenCard( cardListIndex, imageCard[cardListIndex] ); 
      g_openCardList.push( imageCard[cardListIndex] );
//    console.log('g_openCardList.push:', g_openCardList);
    }


    // 그림 2개를 클릭했으면 비교
    if(g_openCardList.length == 2) {
      matchOpenCardList(cardListIndex);

      var isCompleted = checkComplete();
      if (isCompleted == true)
        alert('올~ 바보는 아니네?');
    }
    
    waitTime=0;

  }; // addListener end;

} // end Card
///////////////////////////////////////////////////////////////////////////////

/* 3. 필요 Global 변수 선언
 *  g_count: 두 개의 그림카드가 짝이 맞으면 1이 증가, 즉 12가 되면 게임 종료됨.
 *  g_countClick: 그림 카드를 세번째 클릭하면, 첫번째 클릭을 의미하도록 하기 위해.
 *  g_openCardList: 클릭한 그림 카드를 저장하는 변수. 2개까지만 저장해야 함.
 *  imageCard: 가장 중요한 카드!!!!! 24개의 그림 카드를 객체로 만들어서 관리함.
 *  divList: 24개의 div의 background-image를 조정하기 위해 사용하는 변수.
 */
var g_count = 0;
var g_countClick = 0;
var g_openCardList = [];

var imageCard = new Array(24);
var divList;

///////////////////////////////////////////////////////////////////////////////

//0. 게임 시작
function startGame() {

  initGame(); // 게임 준비 완료 (카드 리스트 만들고, 랜덤하게 섞기)

}

//4. 게임초기화( 카드리스트를 만들고, 랜덤하게 순서섞기 )
function initGame() {

  divList = document.querySelectorAll('div.btn');
  for (var i = 0; i < imageCard.length; i++) {

    // 카드를 랜덤하게 섞기
    cardList[i] = randomCard(i);

    // div에서 id를 가져와서 Card의 첫번째 매개변수로 사용.
    // imageList에서 이미지 파일 경로를 가져와 Card의 두번째 매개변수로 사용.
    imageCard[i] = new Card(divList[i].id, imageList[cardList[i]]);
//    console.log(i, imageCard[i]);

    //백그라운드 이미지를 삽입
    divList[i].style.backgroundImage = 'url("./image/00.jpg")';

    // 5. 카드 클릭 시 카드 뒤집기 위해 click 처리 함수 추가.
    divList[i].onclick = imageCard[i].addListener;
  }
}

// 0 ~ 23까지의 숫자 랜덤 만들기
function randomCard(index) {

  var count = 0;
  var number = 0;
  var isNew = true;

  while (count < 24) {

    number = Math.floor(Math.random() * 24); // 0 ~ 23

    for (var i = 0; i <= index; i++) {
      if (cardList[i] == undefined) {
        return number;
      }

      if (cardList[i] == number) {
        isNew = false;
        break;
      }
    } // end for

    if (isNew) {
      return number;
    }
  }

  return number;
}

/*
 * checkList 유효성 검사 
 * checkList의 길이가 2일 경우 
 * 일치카드이면 제거 아니면 초기화
 * 같은 카드이면 두 카드의 index를 빼면 절대값으로 12가 나오도록 설계되어 있음.
 **/			
function matchOpenCardList(cardListIndex) {

  var matchNumber = Math.abs(g_openCardList[0].cardListValue - g_openCardList[1].cardListValue);

  if (matchNumber % 12 == 0){
    drawClearCard( cardListIndex, g_openCardList[0] );
    drawClearCard( cardListIndex, g_openCardList[1] );
    g_count++;
  }

  g_openCardList = [];
}

/* 모든 짝을 맞췄는지 검사 */
function checkComplete() {

  if (g_count == 12)
    return true;

  return false;
}

/* 짝을 맞춘 카드 그리기 */
function drawClearCard( cardListIndex, card ){

  divList[card.cardListIndex].style.backgroundImage = 'url(' + card.hiddenImage + ')';
  card.same = true;
  console.log(divList[cardListIndex]);
};

/* 
 * 카드 유효성 검사
 * 이미 오픈된 카드와 중복인지 아닌지 체크
 */
function cardValidation( cardListIndex, cardListValue ){

  for ( var i=0; i<g_openCardList.length ; i++ ){
    console.log('index:', cardListIndex, 'openCard:', i, g_openCardList[i].cardListValue);
    if (g_openCardList[i].cardListIndex == cardListIndex) {
      // 같은 그림 연속해서 두번 누르면 그림만 보여주고, 아무 일도 안하도록 함.
      if (g_countClick == 2)
        drawOpenCard( cardListIndex, imageCard[cardListIndex] );

      return false;
    }
  }

  return true;
};

/* 
 * 클릭한 카드 보여주기.
 * 그림 틀렸을 시 0.5초 동안만 hiddenImage 보여주기
 */	    
function drawOpenCard(cardListIndex, imageCard) {
  if (imageCard.same == true) {
    return;
  }

  // 클릭한 카드의 hiddenImage 먼저 보여주기
  divList[cardListIndex].style.backgroundImage = 'url(' + imageCard.hiddenImage + ')';
  imageCard.isClicked = true;

  // 0.5초 뒤에 커버 그림 보여주기
  var cardPiece  = divList[cardListIndex];
  setTimeout(function () {
    // 이 검사를 하지 않으면, 짝이 맞은 그림을 클릭할 때, 커버 그림이 보여지는 버그 발생.
    if (imageCard.same != true)
      cardPiece.style.backgroundImage = 'url("./image/00.jpg")';
  }, 500);
}
