// Simple Arithmetics Grammer
//==========================================
// Expression = Term ("+" Term)*
// Term = Factor ("*" Factor)*
// Factor = "x"




define('Expression', sequence(
    rule('Term'),
    zeroOrMore(sequence(
        '+',
        rule('Term')
    ))
))


define('Term', sequence(
    rule('Factor'),
))




define('Factor', 'x')
