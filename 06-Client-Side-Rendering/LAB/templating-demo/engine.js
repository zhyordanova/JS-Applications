// export function renderTemplate(templateAsString, data) {
//     // console.log(templateAsString,data);

//     const pattern = /{{(.+?)}}/gm;

//     // templateAsString.replace(pattern, (...params) => {
//     //     console.log(params);

//     //     /*Array(4) [ "{{title}}", "title", 19, "<article>\r\n    <h3>{{title}}</h3>\r\n    <div class=\"content body\">\r\n        <p>{{content}}</p>\r\n    </div>\r\n    <footer>Author: {{author}}</footer>\r\n</article>" ]
//     //         0: "{{title}}"
//     //         1: "title"
//     //         2: 19
//     //         3: "<article>\r\n    <h3>{{title}}</h3>\r\n    <div class=\"content body\">\r\n        <p>{{content}}</p>\r\n    </div>\r\n    <footer>Author: {{author}}</footer>\r\n</article>"
//     //         length: 4
//     //         <prototype>: Array []*/
//     // })

//     // templateAsString.replace(pattern, (match, propName) => {
//     //     console.log(match, propName);

//     //     /*{{title}} title engine.js:19:17
//     //       {{content}} content engine.js:19:17
//     //       {{author}} author*/
//     // })

//     // templateAsString.replace(pattern, (match, propName) => {
//     //     console.log(propName, data[propName]);

//     //     /*title Fisrst Article 
//     //       content Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, laborum dolor assumenda aut omnis nihil, quos dolore praesentium, suscipit amet nemo error adipisci totam! Ad perferendis cum necessitatibus fugiat obcaecati.
//     //       author John Smith*/
//     // })

//     return templateAsString.replace(pattern, (match, propName) => {
//         return data[propName]
        
//     });
// }

export function renderTemplate(templateAsString) {
    const pattern = /{{(.+?)}}/gm;

    return (data) => {
        return templateAsString.replace(pattern, (match, propName) => {
            return data[propName]
        });
    };
}