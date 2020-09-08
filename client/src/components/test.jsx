import React from 'react';
//import '../css/reset.css';

export default function TEST()
{
    var obj = { __html: `  When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
    \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]`}

    return (
        <p style={{fontFamily: 'serif'}} dangerouslySetInnerHTML={obj}></p>
    )

    // return (
    //     // <MathComponent tex={String.raw(`When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
    //     // \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]`)} />

    //     <MathComponent tex={String.raw`When \int_0^1 x^2\ dx`} />
    // )
}