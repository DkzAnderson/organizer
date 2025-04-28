import { animate, createScope } from "animejs"
import {  useEffect, useRef, useState } from "react"

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function CreateBackground () {
    let className ;
    let color ;
    let values = [];


    const ClassNameValues = [
        // con borde
            // circulos
        `absolute -top-42 -left-[${random(0, 500)}px] size-12 rounded-full border-2 `,
        `absolute -top-20 -left-[${random(0, 1000)}px] size-12 rounded-full border-4 `,
            // cuadrados
        `absolute -top-36 -left-[${random(200, 1000)}px] size-12 rounded-lg border-2 `,
        `absolute -top-24 -left-[${random(500, 1500)}px] size-12 rounded-lg border-4 `,
        // sin borde
            // circulos
        `absolute -top-36 left-[${random(400, 1000)}px] size-12 rounded-full`,
        `absolute -top-20 left-[${random(600, 1800)}px] size-12 rounded-full`,
            // cuadrados
        `absolute -top-60 left-[${random(50, 700)}px] size-12 rounded-lg skew-24`,
        `absolute -top-42 right-[${random(1000, 2000)}px] size-12 rounded-lg `,
        `absolute -top-60 left-[${random(50, 700)}px] size-12 rounded-lg  `,
    ]

    const Colors = [
        'bg-gradient-to-br from-black/75 to-purple-500/75 ',
        'bg-gradient-to-br from-purple-500/75 to-red-500/75 ',
        'bg-gradient-to-br from-green-500/75 to-amber-500/75 ',
        'bg-gradient-to-br from-blue-500/75 to-purple-500/75 ',
        'bg-gradient-to-br from-amber-500/75 to-sky-500/75 ',
        'bg-gradient-to-br from-lime-500/75 to-purple-500/75 ',
        'bg-gradient-to-br from-blue-500/75 to-green-500/75 ',
        'bg-gradient-to-br from-sky-500/75 to-pink-500/75 ',
        'bg-gradient-to-br from-slate-300/75 to-red-500/75 ',
        'bg-gradient-to-br from-pink-500/75 to-amber-500/75 ',

    ]


    const BorderColor = [
        ' border-lime-500',
        ' border-purple-500',
        ' border-purple-900',
        ' border-lime-900',
        ' border-blue-500',
        ' border-blue-900',
        ' border-amber-500',
        ' border-amber-900',
        ' border-pink-500',
        ' border-pink-900',
    ]



    const NumberOfFigures = random(40,120);


    for (let index = 0; index < NumberOfFigures; index++) {
        
        className = ClassNameValues[random(0,ClassNameValues.length - 1)];
    


        if (className === ClassNameValues[0] ||
            className === ClassNameValues[1] ||
            className === ClassNameValues[2] ||
            className === ClassNameValues[3])
        {
            color = BorderColor[random(0,BorderColor.length - 1)];
        } else {
            color = Colors[random(0,Colors.length - 1)]
            color += ' border-transparent '
        }

        const test = <span key={`Figure-${index}`} className={`Figure-${index} ${className} ${color}`}></span>
        values.push(test);
    }
    
    return values;
}


export const Background = () => {

    const root = useRef <any> (null);
    const scope = useRef <any> (null);
    const [Figures, setFigures] = useState <any[]> ([])
    const [loading, setLoading] = useState(false);


    // Carga de figuras
    useEffect(()=>{
        setLoading(false);
        const FiguresToAnimate = CreateBackground();
        setFigures(FiguresToAnimate); 
        setLoading(true);
    },[])

    // Animar figuras
    useEffect(()=>{
        setTimeout(()=>{
            scope.current = createScope({ root }).add( () =>{

                function randomScale(min: number, max: number): number {
                    return Math.random() * (max - min) + min;
                }
    
            
                for (let index = 0; index < Figures.length; index++) {
                    
                    const duration = random (10000,85000);
                    const translateX = random(200,800);
                    const translateY = 1500;
                    const ease = ['linear','inOut']
                    const rotate = random(90,360);
                    const scale = randomScale(0.25, 2.5);
            
                    animate(`.Figure-${index}`,{
                        translateX: translateX,
                        translateY: translateY,
                        duration: duration,
                        ease: ease[random(0,ease.length - 1 )],
                        rotate: `${rotate}deg`,
                        opacity: .5,
                        autoplay: true,
                        loop: true,
                        scale: scale
                    })
                        
                }
               
            } ) 
        },500)
        


             
    },[loading])


    if(loading){
        return(
            <div ref={root} className="w-full min-h-screen fixed top-0 left-0 z-0">
                <div className="domo relative overflow-hidden h-screen w-full">
                    {Figures.map((image)=>(image))}
                </div>
            </div>
        )
    }
}

