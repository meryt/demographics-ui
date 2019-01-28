
/**
 * Given a document containing polygons, each with an id like "polygon-N", calculates the "value"
 * of each polygon given that the largest polygon will be worth exactly 5000 while the others
 * have a proportionally smaller value. Prints the full list with their values to the console.
 *
 * Intended for use when introducing new maps.
 */
export function calculatePolygonAreas(mapId, document, maxValue = 5000) {
    let list = document.getElementsByTagName('polygon')
    let maxArea = 0
    let areas = {}
    for (let poly of list) {
        let X = []
        let Y = []
        for (let point of poly.points) {
            X.push(point.x)
            Y.push(point.y)
        }
        let area = _polygonArea(X,Y)

        if (area > maxArea) {
            maxArea = area
        }
        areas[poly.id] = area
    }

    console.log(`max area is ${maxArea}`)
    for (let poly of list) {
        poly.style.fill = 'blue'
        poly.style.opacity = (areas[poly.id] / maxArea)
        console.log(`('${mapId}','${poly.id}',${Math.ceil((areas[poly.id] / maxArea) * maxValue)}),`)
    }
}

/**
 * Calculates the area of a polygon given a list of x coordinates and a corresponding list of y coordinates.
 */
function _polygonArea(X, Y) {
    let area = 0
    let j = X.length - 1
    for (let i = 0; i < X.length; i++) {
        area += (X[j] + X[i]) * (Y[j] - Y[i])
        j = i
    }
    return Math.abs(area / 2)
}
