const 수학 = "B";

if (수학 == "A") {
    console.log("이 과목을 Pass 했습니다.");
} else if (수학 == "B"){
    console.log("이 과목을 Pass 했습니다.");
} else if (수학 == "C"){
    console.log("이 과목을 Pass 했습니다.");
} else {
    console.log("이 과목을 Pass하지 못했습니다.");
}


// 강사님 답안
if (수학 == "A" || 수학 == "B" || 수학 == "C") {
    console.log("이 과목을 Pass 했습니다.");
} else {
    console.log("이 과목을 Pass하지 못했습니다.");
}
