# OnChain CloudFunding by WASM

### アプリケーションURL
https://wasm-cloudfund-front.vercel.app/

### リポジトリ（スマートコントラクト）
https://github.com/YasuYasuonFire/wasm_cloudfund_contract

## What it does
オンチェーンで透明性のあるクラウドファンディングを行えるスマートコントラクトです。<br>
提案に対し、ユーザーは自由な金額で寄付を行えます。<br>
必要金額が集まったら、提案者のウォレットへ送金することができます。<br>
<br>
<br>

## The problem it solves
web2までのクラウドファンディングでは、以下のような課題がありました。<br>
* 寄付したお金の行き先が追跡できない
* 誰が寄付したかの情報が、消失する可能性があり、寄付者の貢献の可視化が非永続的

オンチェーンで行うことにより、お金の流れの透明化が行え、<br>
寄付者の履歴も永続的に維持されることになります。<br>
<br>
寄付を集める側は、なお一層健全な資金の使用を求めらることになり、<br>
寄付者は貢献を可視化できるインセンティブを得られます。
<br>
<br>

## Challenges I ran into
* スマートコントラクトにWASMを使用
* 標準実装（OpenBrush）を極力採用し、品質と実装の効率性を向上
<br>
<br>

## Technologies I used
* Rust
* Ink!
* OpenBrush
* swanky
* next.js

## How we built it
solidityの参考コードをベースに機能を取捨選択し、Rustでの実装にインテグレーション。
<br>
<br>


## What we learned
* WASMを用いたスマートコントラクト開発に関わる全般の知見
* Rust, Ink!, swanky, SubstrateなどWASMでの開発を構成する要素でのトラブル原因切り分け
<br>
<br>


## What's next for
WASMを用いた開発の作法をこの機会で掴めました。<br>
EVMとのシームレスな連携が今後のキーだと考えているので、<br>
XVMなど技術動向にキャッチアップしつつ、ハッカソン参加などを通じてWASMでの開発を続けたい。