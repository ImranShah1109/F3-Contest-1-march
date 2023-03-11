function OpeningCeremony(){
    setTimeout(() => {
        console.log("Let the games begin");
        let scores = {red:0,blue:0,green:0,yellow:0};
        Race100M(LongJump,scores);
    }, 1000);
}

function Race100M(LongJump,scores) {
    setTimeout(() => {
        let raceScores = {};
        raceScores.red = RandomTime();
        raceScores.blue = RandomTime();
        raceScores.green = RandomTime();
        raceScores.yellow = RandomTime();

        // console.log("raceScores : ",raceScores);

        let minTime = findWinner(raceScores,scores);

        findSecondWinner(minTime,raceScores,scores);

        console.log("scores ",scores);

        LongJump(HighJump,scores);
    }, 3000);
}


function LongJump(HighJump,scores) {
    setTimeout(() => {
        let winner = randomColor();
        let score = scores[winner];
        scores[winner] = score + 150;
        console.log("Long Jump winner is ", winner," team");
        console.log("scores ",scores);
        HighJump(AwardCeremony,scores);
    }, 2000);
}

function HighJump(AwardCeremony,scores){
    let winner = prompt("What colour secured the highest jump");

    if(winner == null || winner == ""){
        AwardCeremony(scores);
    }
    else{
        if(winner == "red" || winner == "blue" || winner == "green" || winner == "yellow"){
            
            let score = scores[winner];
            scores[winner] = score + 100;
            console.log("High Jumb Winner is ",winner," team ");
            console.log("scores ",scores);
            AwardCeremony(scores);
        }
        else{
            // console.log("not ");
            AwardCeremony(scores);
        }
    }
}

function  AwardCeremony(scores){
    const sortable = Object.fromEntries(
        Object.entries(scores).sort(([,a],[,b]) => b-a)
    );
    
    // console.log("sorted ", sortable);
    let h = document.querySelector('h2');
    let f;
    let s;
    let t;
    let four;
    let i = 1;
    for (const key in sortable) {
        if(i == 1){
            f = key;
        }
        else if(i == 2){
            s = key;
        }
        else if(i == 3){
            t = key;
        }
        else{
            four = key;
        }

        i++;
    }

    h.innerHTML = `${f} comes first with ${sortable[f]} 
                    ${s} comes second with ${sortable[s]} 
                    ${t} comes third with ${sortable[t]}
                    ${four} comes last with ${sortable[four]} `
    console.log(
        `${f} comes first with ${sortable[f]} 
        ${s} comes second with ${sortable[s]} 
        ${t} comes third with ${sortable[t]}
        ${four} comes last with ${sortable[four]} `
        );
}

OpeningCeremony();

function RandomTime(){
    let arr = [10,11,12,13,14,15];
    let i = Math.floor(Math.random()*arr.length);
    let t = arr[i];
    // console.log("time", t);
    return t;
}

function findWinner(raceScores,scores) {
    let min = Number.MAX_VALUE;

    for (const key in raceScores) {
        if(raceScores[key] < min){
            min = raceScores[key];
        }
    }

    for (const key in raceScores) {
        if(raceScores[key] == min){
            scores[key] = 50;
            console.log("Race first Winner is ",key," team ");
        }
    }
    return min;
}

function findSecondWinner(minTime,raceScores,scores){
    let second_minTime = Number.MAX_VALUE;
    for (const key in raceScores) {
        if(raceScores[key] < second_minTime && raceScores[key] > minTime){
            second_minTime = raceScores[key];
        }
    }

    for (const key in raceScores) {
        if(raceScores[key] == second_minTime){
            scores[key] = 25;
            console.log("Race second Winner is ",key," team ");
        }
    }
    // console.log("second ",second_minTime);
}

function randomColor(){
    let col = ["red","blue","green","yellow"];
    let i = Math.floor(Math.random() * col.length);
    return col[i];
}

