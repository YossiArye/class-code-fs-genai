class Shape {
  _color
  #createdAt

  constructor(color) {
    this._color = color
    this.#createdAt = new Date().toISOString()
  }

  area() {
    throw new Error(`${this.constructor.name} must implement area()`)
  }

  getCreatedAt() {
    return this.#createdAt
  }

  describe() {
    console.log(
      `${this.constructor.name} | color: ${this._color} | area:${this.area()}`,
    )
  }
}

class Circle extends Shape {
  #radius

  constructor(color, radius) {
    super(color)
    this.#radius = radius
  }

  area() {
    return Math.PI * this.#radius ** 2
  }
}

class Rectangle extends Shape {
  #width
  #height

  constructor(color, width, height) {
    super(color)
    this.#width = width
    this.#height = height
  }

  area() {
    return this.#width * this.#height
  }
}

class Triangle extends Shape {
  #base
  #height

  constructor(color, base, height) {
    super(color)
    this.#base = base
    this.#height = height
  }

  area() {
    return this.#base * this.#height * 0.5
  }
}

const circ = new Circle("Green", 5)
const rect = new Rectangle("blue", 2, 5)
const tria = new Triangle("black", 2, 5)

const shapes = [circ, rect, tria]


for(const shape of shapes){
    console.log(shape.area());
}