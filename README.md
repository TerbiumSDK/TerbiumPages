# Terbium SDK Pages
Creates Terbium Page Experiences for a project using Terbium SDK.\
**Install Global**\
>npm i -g terbiumsdk-pages\
**Parameters**\
'-p, --path [type]', 'Virtual path to add terbium page.'\
'-n, --name [type]', 'Name of the file to create.'\
'-e, --extend [type]', 'Extend the terbium class out.'\
'-x, --experience [type]', 'Space delimited experiences pe te we etc.'\
\
\
**Basic Usage**\
terbiumsdk-pages -p html/mytestpage -n mytestpage
\
\
\
**(Optional Extending Classes) Extending the page class with another class**\
terbiumsdk-pages -p html/mytestpage -n mytestpage -e ExtendThisClass
\
\
\
**(Optional Experiences) Target specific experiences (Phone, Tablet Desktop/Web)**\
terbiumsdk-pages -p html/mytestpage -n mytestpage -x "pe te we"



