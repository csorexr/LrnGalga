controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 6 6 5 5 6 6 6 . . . . 
        . . . 7 7 7 7 6 6 6 6 6 6 . . . 
        . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
        . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
        . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
        . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
        . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
        . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
        . . . 6 8 8 8 8 8 8 8 8 6 . . . 
        . . . . 6 6 8 8 8 8 6 6 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, splane, 200, 0)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(1)
    music.playTone(131, music.beat(BeatFraction.Half))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.startEffect(effects.spray, 200)
    otherSprite.destroy(effects.ashes, 100)
    info.changeLifeBy(-1)
    music.playMelody("B F D C - - - - ", 366)
})
let bogey: Sprite = null
let projectile: Sprite = null
let splane: Sprite = null
game.splash("Press A to shoot bubbles to kill skulls")
splane = sprites.create(img`
    . . . . . . . . . . . . . c c f f f . . . . . . . . . . . . . . 
    . . . . . . . . . . . c c d d b c f . . . . . . . . . . . . . . 
    . . . . . . . . . . c c d d b b f . . . . . . . . . . . . . . . 
    . . . . . . . . . . f c c b b c f . . . . . . . . . . . . . . . 
    . . . . . f f f f f c c c c c c f f . . . . . . . . . c c c . . 
    . . . f f b b b b b b b c b b b b c f f f . . . . c c b b c . . 
    . . f b b b b b b b b c b c b b b b c c c f f . c d b b c . . . 
    f f b b b b b b f f b b c b c b b b c c c c c f c d b b f . . . 
    f b c b b b 1 1 f f 1 b c b b b b b c c c c c f f b b f . . . . 
    f b b b 1 1 1 1 1 1 1 1 b b b b b c c c c c c c b b c f . . . . 
    . f b 1 1 1 3 3 c c 1 1 b b b b c c c c c c c c c c c f . . . . 
    . . f c c c 3 1 c 1 1 1 b b b c c c c c b d b f f b b c f . . . 
    . . . f c 1 3 c 1 1 1 c b b b f c d d d d c c . . f b b f . . . 
    . . . . f c c c 1 1 1 f b d b b c c d c c . . . . . f b b f . . 
    . . . . . . . . c c c c f c d b b c c . . . . . . . . f f f . . 
    . . . . . . . . . . . . . f f f f f . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
splane.image.flipX()
splane.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
controller.moveSprite(splane, 200, 200)
game.onUpdateInterval(500, function () {
    bogey = sprites.create(img`
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . f f f f . . . . . . . . . . 
        . . . . . . . . f f 1 1 1 1 f f . . . . . . . . 
        . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . . 
        . . . . . . . f 1 1 1 1 1 1 1 d b f . . . . . . 
        . . . . . . f d 1 1 1 1 1 1 1 d d f . . . . . . 
        . . . . . . f d 1 1 1 1 1 1 d d d f . . . . . . 
        . . . . . . f d 1 1 1 d d d d d d f . . . . . . 
        . . . . . . f d 1 1 1 d d d d d d f . . . . . . 
        . . . . . . f d 1 d d d d d d d b f . . . . . . 
        . . . . . . f d 1 d f b d d b b f f . . . . . . 
        . . . . . . f b d d f c d b b c f . . . . . . . 
        . . . . . f f f f c c d d b f f f . . . . . . . 
        . . . . f c b 1 b b b f c f f f f . . . . . . . 
        . . . . f 1 b 1 d c f f f f f f f f . . . . . . 
        . . . . f d f d f . . f f f f f f f f f f . . . 
        . . . . . f . f . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    bogey.setVelocity(randint(-180, -60), 0)
    bogey.setPosition(180, randint(0, 120))
})
