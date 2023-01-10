function setup(){
    createCanvas(400, 400)
    Game.addCommonBalloon()
}

function draw(){
    background("skyblue")
    for(const balloon of Game.balloons){
        balloon.display()
        balloon.move()
        if(balloon.y <= balloon.size/2 && balloon.color != 'black'){
            noLoop()
            Game.balloons.length = 0 
            background(136,220,166)
            let score = Game.score
            Game.score = ''
            textSize(64)
            fill('white')
            textAlign(CENTER,CENTER)
            text('FINISH', 200, 200)
            textSize(34)
            text('SCORE:' + score, 200, 300)
        }
        
    }
    if(frameCount % 30 == 0){
        Game.addCommonBalloon()
    }
    if(frameCount % 60 == 0){
        Game.addUniqBalloon()
    }
    if(frameCount % 100 == 0){
        Game.addAngryBalloon()
    }
    textSize(32)
    fill('black')
    text(Game.score, 20, 40)
}
function mousePressed(){
    if(!isLooping()){
        loop()
        Game.score = 0
    }
    Game.checkIfBalloonBurst()
}
class Game{
    static balloons = []
    static score = 0
    static addCommonBalloon(){
        let balloon = new CommonBalloon('blue', 50)
        this.balloons.push(balloon)
    }
    static addUniqBalloon(){
        let uniqBalloon = new UniqBalloon('green',25)
        this.balloons.push(uniqBalloon)
    }
    static addAngryBalloon(){
        let angryBalloon = new AngryBalloon('black',50)
        this.balloons.push(angryBalloon)
    }

    static checkIfBalloonBurst(){
        this.balloons.forEach((balloon, index) => {
            let distance = dist(balloon.x, balloon.y, mouseX, mouseY)
            if(distance<=balloon.size/2){
                balloon.burst(index)
            }
        }
        )
    }
}
class CommonBalloon{
    constructor(color, size){
        this.x = random(width)
        this.y = random(height - 10, height + 50)
        this.color = color
        this.size = size
    }
    display(){
        fill(this.color)
        ellipse(this.x, this.y, this.size)
        line(this.x, this.y + this.size / 2, this.x, this.y + this.size * 2)
    }
    move(){
        this.y -= 1 + Math.floor(Game.score / 50)
    }
    burst(index){
        Game.balloons.splice(index, 1)
        Game.score += 1
    }
}
class UniqBalloon extends CommonBalloon{
    burst(index){
        Game.balloons.splice(index, 1)
        Game.score += 10
    }
}
class AngryBalloon extends CommonBalloon{
    burst(index){
        Game.balloons.splice(index, 1)
        Game.score -= 10
    }
}