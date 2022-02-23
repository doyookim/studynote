// 【문항4】 동수는 제과점에 과자를 사러 가는데 
// 현재 가진 돈이 모자랄 경우 부모님께 모자란 돈을 받으려고 한다. 
// 과자 한 개의 가격이 K, 사려고 하는 과자의 개수가 N, 현재 가진 돈의 액수를 M이라 할 때 
// 여러분은 동수가 부모님께 받아야 하는 모자란 돈을 계산하려고 한다. 


// 예를 들어, 과자 한 개의 가격이 30원, 사려고 하는 과자의 개수가 4개, 현재 동수가 가진 돈이 100원이라 할 때, 
// 동수가 부모님께 받아야 하는 돈은 20원이다. 
// 과자 한 개의 가격이 250원, 사려고 하는 과자의 개수가 2개, 현재 동수가 가진 돈이 140원이라 할 때, 
// 동수가 부모님께 받아야 하는 돈은 360원이다. 
// 과자 한 개의 가격이 20원, 사려고 하는 과자의 개수가 6개, 현재 동수가 가진 돈이 120원이라 할 때 
// 동수가 부모님께 받아야 하는 돈은 0원이다. 
// 과자 한 개의 가격이 20원, 사려고 하는 과자의 개수가 10개, 현재 동수가 가진 돈이 320원이라 할 때 
// 동수가 부모님께 받아야 하는 돈은 역시 0원이다. 
// 과자 한 개의 가격, 사려고 하는 과자의 개수와 동수가 현재 가진 돈의 액수가 주어질 때 동수가 
// 부모님께 받아야 하는 돈의 액수를 리턴하는 함수 solution을 작성하고 리턴값을 출력하시오. 
// (30분/20점)

let sum = 0;
let money = 0;


function solution(K, N, M){
    sum = K * N;
    //console.log(sum);
    if ( sum > M){
        money = sum - M;
       // console.log(money);
        console.log("동수가 부모님께 받아야 하는 돈은 %d원 입니다.", + money);
    } else {
        money = 0;
        console.log("동수가 부모님께 받아야 하는 돈은 %d원 입니다.", + money);
    }

    
    
}

// K=30, N=4, M=100인 경우
solution(30, 4, 100);
// K=250, N=2, M=140인 경우
solution(250, 2, 140);
// K=20, N=6, M=120인 경우
solution(20, 6, 120);
// K=20, N=10, M=320인 경우
solution(20, 10, 320);