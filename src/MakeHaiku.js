// import { useState, useEffect} from "react";

// function MakeHaiku({searchedWord, setSearchedWord, setUserInput}) {
//     const [line1, setLine1] = useState(5)
//     const [line2, setLine2] = useState(7)
//     const [line3, setLine3] = useState(5)


//     useEffect (() => {
//         const usedSyllables = searchedWord[0]['numSyllables']
//         console.log ('this is searchedWord', searchedWord[0]['numSyllables'])
        
//         if( line1 > 0 ){
//             setLine1(line1 - usedSyllables)
//         } else if ( line2 > 0 ){
//             setLine2(line2 - usedSyllables)
//         } else if ( line3 > 0 ) {
//             setLine3(line3 - usedSyllables)
//         } else {
//             console.log('you are done');
//         }
//         setSearchedWord([]);
//         setUserInput('');
//     },[])

//     return (
//         <div>
//             <ul>
//                 <li>{line1}</li>
//                 <li>{line2}</li>
//                 <li>{line3}</li>
//             </ul>
//         </div>
//     )
// }

// export default MakeHaiku