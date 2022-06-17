module Main

open Feliz
open Browser.Dom
open Fable.Core.JsInterop

// Workaround to have React-refresh working
// I need to open an issue on react-refresh to see if they can improve the detection
emitJsStatement () "import React from \"react\""

[<ReactComponent>]
let private Component () =
    let isLeftPanelVisible, setLeftPanelVisibility = React.useState true

    Html.div "Hello"

ReactDOM.render(
    Component ()
    ,
    document.getElementById("root")
)
