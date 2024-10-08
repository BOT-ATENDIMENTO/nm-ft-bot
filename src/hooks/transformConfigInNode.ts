import { Node, MarkerType } from 'reactflow';


export const transformConfigInNode = (Config: any) => {
    let nodes: any = []
    let edges: any = []
    let x = 100
    let y = 300

    for (let id in Config) {
        let item = Config[id]

        if (item.type == 'text' || item.type == 'question') {

            if (item.positions) {
                x = item.positions.x;
                y = item.positions.y;
            }

            nodes.push({
                id: item.id,
                type: 'square',
                position: {
                    x: x,
                    y: y,
                },
                data: {
                    label: item.name
                },
            })


            edges.push({
                id: `Id${item.id}&Next${item.next}`,
                source: item.id,
                sourceHandle: "right",
                target: item.next,
                targetHandle: "left",
                type: "default",
            })
        } else if (item.type == 'options') {
            if (item.positions) {
                x = item.positions.x;
                y = item.positions.y;
            }
            nodes.push({
                id: item.id,
                type: 'square',
                position: {
                    x: x,
                    y: y,
                },
                data: {
                    label: item.name
                },
            })

            let options = item.options

            for (let o in options) {
                let option = options[o]
                edges.push({
                    id: `Id${item.id}&OptionId${option.id}&Next${option.next}`,
                    source: item.id,
                    sourceHandle: "right",
                    target: option.next,
                    targetHandle: "left",
                    type: "default",
                })
            }
        }
        x = x + 200
    }

    return [nodes, edges]
    console.log('TRANSFORMADO')

}