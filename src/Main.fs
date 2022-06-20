module Main

open System
open Feliz
open Browser.Dom
open Fable.Core.JsInterop

// Workaround to have React-refresh working
// I need to open an issue on react-refresh to see if they can improve the detection
emitJsStatement () "import React from \"react\""

[<ReactComponent>]
let private Component () =
    let isLeftPanelVisible, setLeftPanelVisibility = React.useState true
    let time, setTime = React.useState DateTime.Now

    React.useEffectOnce(fun () ->
        Fable.Core.JS.setInterval (fun () ->
            setTime DateTime.Now
        ) 1000 |> ignore
    )

    Html.div $"""Time is {time.ToString("HH:mm:ss")}"""

ReactDOM.render(
    Component ()
    ,
    document.getElementById("root")
)
