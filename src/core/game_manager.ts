import assert from 'assert'
import sleep from './sleep'
import Player from './domain/player'
import PlayerUser from '~/core/domain/player_user'
import PlayerComputer from '~/core/domain/player_computer'
import GameController from '~/core/game_controller'

const DEFAULT_HAND_COUNT = 5
const DRAW_COUNT_PER_TURN = 1

/**
 * ゲームの進行を管理するクラス
 */
class GameManager {
  turnPlayer: Player
  playerComputer: PlayerComputer
  playerUser: PlayerUser
  game_controller: GameController

  turnCount = 1

  showSnackBar = false
  snackBarText = ''

  /**
   * コンストラクタ
   * @param {PlayerComputer} playerComputer コンピュータープレイヤー
   * @param {PlayerUser} playerUser ユーザープレイヤー
   */
  constructor(playerComputer: PlayerComputer, playerUser: PlayerUser) {
    this.game_controller = new GameController(this)
    this.playerComputer = playerComputer
    this.playerUser = playerUser

    this.playerComputer.setGameController(this.game_controller)
    this.playerUser.setGameController(this.game_controller)

    this.playerComputer.setOpponentPlayer(this.playerUser)
    this.playerUser.setOpponentPlayer(this.playerComputer)

    this.turnPlayer = this.playerUser
  }

  /**
   * ゲームを開始する。
   *
   * 1. デッキのシャッフル
   * 2. 初期手札のドロー
   * 3. メインループ開始
   */
  async start(): Promise<void> {
    this.playerComputer.deck.shuffle()
    this.playerUser.deck.shuffle()

    await Promise.all([
      this.playerComputer.draw(DEFAULT_HAND_COUNT),
      this.playerUser.draw(DEFAULT_HAND_COUNT),
    ])
    await this.showInfo('start match')
    this.game_loop()
  }

  /**
   * ゲームのメインループ処理
   *
   * 1. 自分のフィールドのカードの「自分のターン開始時」処理を実行
   * 2. 相手のフィールドのカードの「相手のターン開始時」処理を実行
   * 3. 自分のフィールドのカードの「行動済み」フラグをリセット
   * 4. 自分プレイヤーが補助金を受け取る処理を実行
   * 5. 自分のフィールドのカードのコストを支払う処理を実行
   * 6. カードをドローする処理を実行
   * 7. 行動を受付開始
   */
  async game_loop() {
    assert(this.turnPlayer.opponentPlayer)

    // 自分のフィールドのカードの「自分のターン開始時」処理を実行
    for (const card of this.turnPlayer.field.cards) {
      await card.onStartedOwnerTurn(card)
    }
    // 相手のフィールドのカードの「相手のターン開始時」処理を実行
    for (const card of this.turnPlayer.opponentPlayer.field.cards) {
      await card.onStartedOpponentTurn(card)
    }
    // 自分のフィールドのカードの「行動済み」フラグをリセット
    this.turnPlayer.field.cards.forEach((card) => {
      card.isActed = false
    })
    // 自分プレイヤーが補助金を受け取る処理を実行
    await this.turnPlayer.increaseAssets(this.getSubsidy())
    // 自分のフィールドのカードのコストを支払う処理を実行
    await this.turnPlayer.payFieldCardCost()

    // カードをドローする処理を実行
    await this.turnPlayer.draw(DRAW_COUNT_PER_TURN)
    // 行動を受付開始
    this.turnPlayer.canAct = true
    this.turnPlayer.waitAction()
  }

  /**
   * 次のターンに移る
   *
   * 1. 行動の受付を終了
   * 2. ターン数のインクリメント
   * 3. ターンプレイヤーの変更
   * 4. メイン処理に移る
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async changeTurn(): Promise<void> {
    this.turnPlayer.canAct = false
    await this.showInfo('Change Turn')
    // ターン数のインクリメント
    this.turnCount++

    // ターンプレイヤーの変更
    const opponentPlayer = this.turnPlayer.opponentPlayer
    assert(opponentPlayer)
    this.turnPlayer = opponentPlayer
    this.game_loop()
  }

  /**
   * 指定のターンに受け取れる補助金の額を返す
   * @param {number} [turnCount=this.turnCount] ターン数
   * @returns {number} 受け取る補助金
   */
  getSubsidy(turnCount: number = this.turnCount): number {
    const baseSubsidy = 1000
    return turnCount * baseSubsidy
  }

  /**
   * メッセージをスナックバーとして表示する。
   * @param message メッセージ
   * @returns {Promise<void>} Promiseオブジェクト
   */
  async showInfo(message: string): Promise<void> {
    this.showSnackBar = true
    this.snackBarText = message
    await sleep(1300)
  }
}

export default GameManager
