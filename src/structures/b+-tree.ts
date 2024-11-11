// 단말노드는 ceil( N-1 / 2 ) 최소 자식 수
// 내부노드는 ceil( N / 2) 최소 자식 수
class Node {
  public parent: Node | null = null
  public searchKeys: Array<string | null> = []
  public children: Array<Node | null> = []

  public isRootNode: boolean = false
  public isLeafNode: boolean = false

  private maxSize: number = 4

  constructor(
    maxSize: number,
    isLeafNode: boolean = false,
    isRootNode: boolean = false
  ) {
    this.maxSize = maxSize
    this.clear()

    this.isLeafNode = isLeafNode
    this.isRootNode = isRootNode
  }

  // null이 아닌 값 기준 ex) [1,2,null] -> 1
  public get lastIndex() {
    // 리프노드는 마지막 포인터가 오른쪽 리프노드니까 -2
    // 인터널노드는 마지막 포인터가 오른쪽 자식노드니까 -1
    const last = this.isLeafNode
      ? this.children.length - 2
      : this.children.length - 1

    let index = -1
    for (let i = last; i >= 0; i--) {
      if (this.children[i] !== null) {
        index = i
        break
      }
    }
    return index
  }

  public get isEmpty() {
    return this.lastIndex === -1
  }

  public get isFull() {
    return this.lastIndex === this.children.length - 1
  }

  public get lastChild() {
    return this.children.at(this.lastIndex) as Node | null
  }

  public findEqualIndex(searchKey: string) {
    return (this.searchKeys as string[]).findIndex((key) => key === searchKey)
  }

  public findFirstGteIndex(searchKey: string) {
    if (this.isEmpty) return -1
    return (this.searchKeys as string[]).findIndex((key) => key >= searchKey)
  }

  public copyTo(target: Node) {
    // leaf 마지막 노드는 오른쪽 리프노드를 가르키니 복사 제외
    target.searchKeys = [...this.searchKeys]

    if (this.isLeafNode) {
      target.children = [...this.children.slice(0, this.lastIndex), null]
    } else {
      target.children = [...this.children.slice()]
    }
  }

  public splitBetween(nodeA: Node, nodeB: Node) {
    const keysSplitIndex = Math.floor(this.maxSize / 2)
    for (let i = 0; i < this.lastIndex; i++) {
      if (i < keysSplitIndex) {
        nodeA.searchKeys[i] = this.searchKeys[i]
      } else {
        nodeB.searchKeys[i - keysSplitIndex] = this.searchKeys[i]
      }
    }

    const itemsSplitIndex = keysSplitIndex + 1
    for (let i = 0; i < this.lastIndex; i++) {
      if (i < itemsSplitIndex) {
        nodeA.children[i] = this.children[i]
      } else {
        nodeB.children[i - itemsSplitIndex] = this.children[i]
      }
    }
  }

  public clear() {
    this.searchKeys = Array.from({ length: this.maxSize - 1 }, () => null)
    // 리프 노드일 경우 마지막 노드는 오른쪽 리프 노드를 가르킴
    this.children = Array.from({ length: this.maxSize }, () => null)
  }

  public findChildIndex(node: Node) {
    return this.children.findIndex((child) => child === node)
  }
}

export class BTree {
  private root: Node | null = null
  private degree: number = 4

  constructor(iter: Iterable<any> | null = null, degree: number = 4) {
    this.degree = degree
    if (iter) {
      for (const item of iter) {
        // this.insert(item)
      }
    }
  }

  public print() {
    // 아래 같은 형식이 각 노드의 형태
    // level 1
    // level 2 일 때
    // 마지막 레벨은 서로 연결
    // ┌──────┐─────┐──────┐
    // │ node │ key │ node │
    // └──────┘─────┘──────┘
    // ──────────┴──────────┬──────────────────────
    //                      │
    // ──┐        ┌──────┐─────┐──────┐        ┌───
    // e │────────│ node │ key │ node │────────│ no
    // ──┘        └──────┘─────┘──────┘        └───
    // 위와 같은 패턴으로 tree 구조 출력하는 함수
    // 정확한 구조를 위해 가장 하위 노드부터 쌓아올라가는 방식으로 출력
  }

  // 무조건 리프 노드를 찾아야함.
  private findLeafNode(searchKey: string): Node {
    if (this.root === null) throw new Error('root is null')

    let currentNode = this.root

    while (!currentNode.isLeafNode) {
      // 현재 노드의 자식 노드에서 어떤 i번째 노드를 탐색할지 찾는다.
      const i = currentNode.findFirstGteIndex(searchKey)

      if (i === -1) {
        // internal node에는 자식 노드가 최소 1개 이상 있음. ( floor(n/2)) )
        currentNode = currentNode.lastChild as Node
        continue
      }

      // searchKey = K[i]
      if (searchKey === currentNode.searchKeys[i]) {
        currentNode = currentNode.children[i + 1] as Node
        continue
      }

      // searchKey < K[i]
      currentNode = currentNode.children[i] as Node
    }

    return currentNode
  }

  public find(searchKey: string) {
    if (this.root === null) return null

    const leafNode = this.findLeafNode(searchKey)

    for (let i = 0; i <= leafNode.lastIndex; i++) {
      if (searchKey === leafNode.searchKeys[i]) {
        return leafNode.children[i]
      }
    }

    return null
  }

  public insert(searchKey: string, item: any) {
    if (this.root === null) this.root = new Node(this.degree, true)

    const leafA = this.findLeafNode(searchKey)

    // leafNode가 가득 차있지 않다면 리프노드에 insert
    if (!leafA.isFull) return this.insertIntoLeaf(leafA, searchKey, item)

    // leafNode가 가득 차있다면, split이 필요함.
    // NewNode 생성
    // LeafNode의 사본 Temp 생성 (깊복)
    // LeafNode에 새로운 값 삽입
    const newLeafB = new Node(this.degree, true)
    const tempLeafA = new Node(this.degree, true)
    leafA.copyTo(tempLeafA)
    this.insertIntoLeaf(tempLeafA, searchKey, item)

    // NewNode.items[lastIndex] = LeafNode.items[lastIndex]
    // LeafNode.items[lastIndex] = Temp
    // LeafNode에서 items을 초기화.lastItem 제외
    newLeafB.children[this.degree - 1] = leafA.children.at(-1) as Node
    leafA.clear()
    leafA.children[this.degree - 1] = newLeafB

    // Temp.items[0~n/2-1]을 복사해 LeafNode.items로 넣는다
    // Temp.items[n/2~n]을 복사해 NewLeaf.items로 넣는다
    tempLeafA.splitBetween(leafA, newLeafB)

    // middleKey = smallest(NewLeaf.items)
    // insertIntoParent(LeafNode, middleKey, newLeaf)
    const middleKeyB = newLeafB.searchKeys[0] as string
    this.insertIntoParent(leafA, middleKeyB, newLeafB)
  }

  private insertIntoLeaf(leafNode: Node, searchKey: string, item: any) {
    // searchKey는 L.K[i] 보다 크거나 같고 L.K[i+1]보다 작거나 같을 수 있음.
    // 크면 i+1, 작거나 같으면 그 자리에 searchKey가 들어가고, 나머지 값은 뒤로 밀림.
    if (searchKey < (leafNode.searchKeys[0] as string)) {
      leafNode.searchKeys = [
        searchKey,
        ...leafNode.searchKeys.slice(0, leafNode.lastIndex)
      ]
      leafNode.children = [
        item,
        ...leafNode.children.slice(0, leafNode.lastIndex),
        leafNode.children.at(-1)
      ]
      return
    }

    for (let i = leafNode.lastIndex - 1; i >= 0; i--) {
      if ((leafNode.searchKeys[i] as string) <= searchKey) {
        leafNode.searchKeys = [
          ...leafNode.searchKeys.slice(0, i + 1),
          searchKey,
          ...leafNode.searchKeys.slice(i + 1)
        ]
        leafNode.children = [
          ...leafNode.children.slice(0, i + 1),
          item,
          ...leafNode.children.slice(i + 1, leafNode.lastIndex),
          leafNode.children.at(-1)
        ]
      }
    }
  }

  private insertIntoParent(leafA: Node, middleKeyB: string, leafB: Node) {
    // LeafNode(node)가 root라면
    //    newRootNode 생성 children = [LeafNode, middleKey, newLeafNode]
    //    root = newRootNode
    //    return
    // ParentNode = parent(LeafNode)
    // if ParentNode가 가득 차있지 않다면
    //    (middleKey, newLeafNode) 쌍을 node(N)의 부모 children에 적절한 위치에 삽입
    // else (오른쪽 split)
    // newNode 복사해서 Temp 생성
    // (P.key, P.node) 쌍을 node(N)의 임시 부모(T)에 적절한 위치에 삽입
    // P의 children 모두 지움, create P'2
    // P에 T.[0~n/2-1] 삽입,
    // middleKey2 = T.[] (smallest P2)
    // P2에 T.[n/2~n] 삽입
    // insertIntoParent(P, middleKey2, P2)

    if (leafA.isRootNode) {
      const newRoot = new Node(this.degree, false, true)
      newRoot.children[0] = leafA
      newRoot.searchKeys[0] = middleKeyB
      newRoot.children[1] = leafB
      leafA.parent = newRoot
      leafA.isRootNode = false

      this.root = newRoot

      return
    }

    const parentA = leafA.parent as Node
    if (!parentA?.isFull) {
      const leafAIndexFromParent = parentA?.findChildIndex(leafA)
      parentA.searchKeys = [
        ...parentA.searchKeys.slice(0, leafAIndexFromParent + 1),
        middleKeyB,
        ...parentA.searchKeys.slice(leafAIndexFromParent + 1)
      ]
      parentA.children = [
        ...parentA.children.slice(0, leafAIndexFromParent + 1),
        leafB,
        ...parentA.children.slice(leafAIndexFromParent + 1)
      ]
      return
    }

    const tempParentA = new Node(this.degree)
    parentA.copyTo(tempParentA)

    const leafAIndexFromTempParentA = tempParentA?.findChildIndex(leafA)
    tempParentA.searchKeys = [
      ...tempParentA.searchKeys.slice(0, leafAIndexFromTempParentA + 1),
      middleKeyB,
      ...tempParentA.searchKeys.slice(leafAIndexFromTempParentA + 1)
    ]
    tempParentA.children = [
      ...tempParentA.children.slice(0, leafAIndexFromTempParentA + 1),
      leafB,
      ...tempParentA.children.slice(leafAIndexFromTempParentA + 1)
    ]

    parentA.clear()
    const newParentB = new Node(this.degree)

    tempParentA.splitBetween(parentA, newParentB)

    const parentMiddleKeyB = newParentB.searchKeys[0] as string
    this.insertIntoParent(parentA, parentMiddleKeyB, newParentB)
  }

  // 중복 없다는 가정
  public delete(searchKey: string) {
    const leafNode = this.findLeafNode(searchKey)
    this.deleteEntry(leafNode, searchKey)
  }

  private deleteEntry(node: Node, searchKey: string) {
    // delete K, P from Node
    const targetIndex = node.findEqualIndex(searchKey)
    if (targetIndex === -1) throw new Error('target not found')

    node.searchKeys.splice(targetIndex, 1)
    node.children.splice(targetIndex, 1)

    // if(node.isRootNode && node.lastIndex === 0) {
    //   //
    // }
    // node가 root && 자식이 하나면
    // node를 삭제하고 자식을 root로 설정???

    // 자식이 2개 이상이라면
    // NodeB는 nodeA의 부모의 이전 또는 다음 형제 노드.
    // keyB는 nodeA와 nodeB의 사이에 있는 키.
  }
}
