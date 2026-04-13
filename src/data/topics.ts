export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Topic {
  slug: string;
  title: string;
  description: string;
  category: "sorting" | "searching" | "data-structures" | "graphs";
  difficulty: Difficulty;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  code: string;
  explanation: string;
  steps: string[];
}

export const topics: Topic[] = [
  // ─── SORTING ────────────────────────────────────────────────
  {
    slug: "bubble-sort",
    title: "Bubble Sort",
    description: "A simple comparison-based sorting algorithm that repeatedly swaps adjacent elements.",
    category: "sorting",
    difficulty: "beginner",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    steps: [
      "Compare adjacent elements in the array.",
      "Swap them if they are in the wrong order.",
      "Repeat the pass until no swaps are needed.",
    ],
    explanation:
      "Bubble Sort works by repeatedly scanning the list and swapping neighbouring elements that are out of order. Each full pass 'bubbles' the largest unsorted element to its correct position. An optimised version tracks whether any swap occurred; if none did, the list is already sorted and the algorithm exits early.",
    code: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    arr = arr.copy()
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # already sorted
    return arr


# Example
print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# [11, 12, 22, 25, 34, 64, 90]`,
  },
  {
    slug: "merge-sort",
    title: "Merge Sort",
    description: "An efficient, divide-and-conquer sorting algorithm with guaranteed O(n log n) time.",
    category: "sorting",
    difficulty: "intermediate",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    steps: [
      "Divide the array in half recursively until each sub-array has one element.",
      "Merge pairs of sub-arrays back in sorted order.",
      "Continue merging until the entire array is sorted.",
    ],
    explanation:
      "Merge Sort splits the input in half, sorts each half recursively, then merges the two sorted halves into one sorted sequence. Because every level of the recursion tree does O(n) work and there are O(log n) levels, the total time is O(n log n). It is stable and predictable, making it a popular choice for sorting linked lists and external data.",
    code: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return _merge(left, right)


def _merge(left: list[int], right: list[int]) -> list[int]:
    result: list[int] = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


# Example
print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# [3, 9, 10, 27, 38, 43, 82]`,
  },
  {
    slug: "quick-sort",
    title: "Quick Sort",
    description: "A fast, divide-and-conquer sorting algorithm using a pivot element.",
    category: "sorting",
    difficulty: "intermediate",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    steps: [
      "Choose a pivot element from the array.",
      "Partition: move elements smaller than the pivot to the left, larger to the right.",
      "Recursively apply Quick Sort to the left and right partitions.",
    ],
    explanation:
      "Quick Sort selects a pivot and rearranges the array so that every element to the pivot's left is smaller and every element to its right is larger. It then recurses on both sides. The worst case O(n²) occurs when the pivot is always the smallest or largest element (e.g. already-sorted input with a naïve pivot choice). Randomising the pivot or using median-of-three selection mitigates this.",
    code: `import random

def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    pivot = random.choice(arr)
    less    = [x for x in arr if x <  pivot]
    equal   = [x for x in arr if x == pivot]
    greater = [x for x in arr if x >  pivot]

    return quick_sort(less) + equal + quick_sort(greater)


# Example
print(quick_sort([10, 7, 8, 9, 1, 5]))
# [1, 5, 7, 8, 9, 10]`,
  },

  // ─── SEARCHING ──────────────────────────────────────────────
  {
    slug: "binary-search",
    title: "Binary Search",
    description: "An efficient algorithm for finding an element in a sorted array.",
    category: "searching",
    difficulty: "beginner",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    steps: [
      "Start with the full sorted array.",
      "Compare the target with the middle element.",
      "If equal, return the index. If smaller, search the left half. If larger, search the right half.",
      "Repeat until found or the search space is empty.",
    ],
    explanation:
      "Binary Search exploits the sorted property of an array: at every step it can eliminate half of the remaining candidates. This yields O(log n) comparisons — far better than the O(n) of linear search for large inputs. The array must be sorted first; if repeated searches will be performed, the one-time sorting cost is easily amortised.",
    code: `def binary_search(arr: list[int], target: int) -> int:
    """Return the index of target in arr, or -1 if not found."""
    lo, hi = 0, len(arr) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1


# Example
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1`,
  },
  {
    slug: "linear-search",
    title: "Linear Search",
    description: "The simplest search algorithm — scan every element one by one.",
    category: "searching",
    difficulty: "beginner",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    steps: [
      "Start from the first element of the array.",
      "Compare each element with the target value.",
      "Return the index when a match is found, or -1 if the end is reached.",
    ],
    explanation:
      "Linear Search scans elements one at a time from the beginning. It works on unsorted data and requires no pre-processing. The trade-off is efficiency: for large arrays the average case is O(n). Use it when the array is small, unsorted, or searched infrequently.",
    code: `def linear_search(arr: list[int], target: int) -> int:
    """Return the index of target in arr, or -1 if not found."""
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1


# Example
arr = [4, 2, 7, 1, 9, 3]
print(linear_search(arr, 9))  # 4
print(linear_search(arr, 5))  # -1`,
  },

  // ─── DATA STRUCTURES ────────────────────────────────────────
  {
    slug: "linked-list",
    title: "Linked List",
    description: "A linear data structure where each element points to the next.",
    category: "data-structures",
    difficulty: "beginner",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    steps: [
      "Each node stores a value and a reference to the next node.",
      "The head pointer marks the start of the list.",
      "Traverse by following next pointers until None is reached.",
    ],
    explanation:
      "A Linked List stores elements in nodes that are connected by pointers. Unlike arrays, nodes are not stored contiguously in memory, so insertion and deletion at the head are O(1). Random access, however, requires O(n) traversal. Linked lists are the building block for stacks, queues, and many other structures.",
    code: `class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: "Node | None" = None


class LinkedList:
    def __init__(self):
        self.head: Node | None = None

    def append(self, data: int) -> None:
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data: int) -> None:
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data: int) -> None:
        if self.head is None:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

    def to_list(self) -> list[int]:
        result, current = [], self.head
        while current:
            result.append(current.data)
            current = current.next
        return result


# Example
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.prepend(0)
print(ll.to_list())   # [0, 1, 2, 3]
ll.delete(2)
print(ll.to_list())   # [0, 1, 3]`,
  },
  {
    slug: "stack",
    title: "Stack",
    description: "A LIFO (Last-In, First-Out) data structure.",
    category: "data-structures",
    difficulty: "beginner",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    steps: [
      "Push: add an element to the top.",
      "Pop: remove and return the top element.",
      "Peek: view the top element without removing it.",
    ],
    explanation:
      "A Stack follows the Last-In, First-Out principle — the most recently added item is always the first to be removed. It is used in function call management (the call stack), undo mechanisms, expression parsing, and depth-first search. Python lists make an efficient stack via append() / pop().",
    code: `class Stack:
    def __init__(self):
        self._data: list = []

    def push(self, item) -> None:
        self._data.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._data.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._data[-1]

    def is_empty(self) -> bool:
        return len(self._data) == 0

    def __len__(self) -> int:
        return len(self._data)


# Example
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.peek())   # 3
print(stack.pop())    # 3
print(len(stack))     # 2`,
  },
  {
    slug: "binary-search-tree",
    title: "Binary Search Tree",
    description: "A tree data structure where each node has at most two children, maintaining sorted order.",
    category: "data-structures",
    difficulty: "intermediate",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    steps: [
      "Insert: place values smaller than the node to the left, larger to the right.",
      "Search: at each node go left if target is smaller, right if larger.",
      "In-order traversal visits nodes in ascending order.",
    ],
    explanation:
      "A Binary Search Tree (BST) keeps data organised so that every left subtree contains only values less than the parent, and every right subtree contains only values greater. This enables O(log n) search, insert, and delete on average. In the worst case — a degenerate tree from sorted input — operations degrade to O(n). Self-balancing variants (AVL, Red-Black) avoid this.",
    code: `class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left:  "BSTNode | None" = None
        self.right: "BSTNode | None" = None


class BST:
    def __init__(self):
        self.root: BSTNode | None = None

    def insert(self, value: int) -> None:
        self.root = self._insert(self.root, value)

    def _insert(self, node: BSTNode | None, value: int) -> BSTNode:
        if node is None:
            return BSTNode(value)
        if value < node.value:
            node.left = self._insert(node.left, value)
        elif value > node.value:
            node.right = self._insert(node.right, value)
        return node

    def search(self, value: int) -> bool:
        return self._search(self.root, value)

    def _search(self, node: BSTNode | None, value: int) -> bool:
        if node is None:
            return False
        if value == node.value:
            return True
        if value < node.value:
            return self._search(node.left, value)
        return self._search(node.right, value)

    def inorder(self) -> list[int]:
        result: list[int] = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node: BSTNode | None, result: list[int]) -> None:
        if node:
            self._inorder(node.left, result)
            result.append(node.value)
            self._inorder(node.right, result)


# Example
bst = BST()
for v in [5, 3, 7, 1, 4, 6, 8]:
    bst.insert(v)
print(bst.inorder())       # [1, 3, 4, 5, 6, 7, 8]
print(bst.search(4))       # True
print(bst.search(9))       # False`,
  },

  // ─── GRAPHS ─────────────────────────────────────────────────
  {
    slug: "bfs",
    title: "Breadth-First Search",
    description: "Graph traversal that explores all neighbours at the current depth before going deeper.",
    category: "graphs",
    difficulty: "intermediate",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    steps: [
      "Enqueue the starting node and mark it as visited.",
      "Dequeue a node, process it, and enqueue all unvisited neighbours.",
      "Repeat until the queue is empty.",
    ],
    explanation:
      "BFS explores a graph level by level using a queue. It guarantees the shortest path (in number of edges) between the source and any reachable node in an unweighted graph. V is the number of vertices and E is the number of edges — the algorithm visits each at most once.",
    code: `from collections import deque

Graph = dict[str, list[str]]

def bfs(graph: Graph, start: str) -> list[str]:
    visited: set[str] = set()
    order:   list[str] = []
    queue = deque([start])
    visited.add(start)

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbour in graph[node]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)

    return order


# Example
graph: Graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"],
}
print(bfs(graph, "A"))
# ['A', 'B', 'C', 'D', 'E', 'F']`,
  },
  {
    slug: "dfs",
    title: "Depth-First Search",
    description: "Graph traversal that explores as far as possible along each branch before backtracking.",
    category: "graphs",
    difficulty: "intermediate",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    steps: [
      "Mark the starting node as visited and push it onto the stack.",
      "Pop a node, process it, and push all unvisited neighbours.",
      "Repeat until the stack is empty.",
    ],
    explanation:
      "DFS follows one path as deep as possible before backtracking. It can be implemented with an explicit stack or via recursion (using the call stack). DFS is used for cycle detection, topological sorting, maze solving, and connected-component analysis.",
    code: `Graph = dict[str, list[str]]

def dfs(graph: Graph, start: str) -> list[str]:
    visited: set[str] = set()
    order:   list[str] = []

    def _dfs(node: str) -> None:
        visited.add(node)
        order.append(node)
        for neighbour in graph[node]:
            if neighbour not in visited:
                _dfs(neighbour)

    _dfs(start)
    return order


# Example
graph: Graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"],
}
print(dfs(graph, "A"))
# ['A', 'B', 'D', 'E', 'F', 'C']`,
  },
];

export const categories = [
  { slug: "sorting",         label: "Sorting",          description: "Algorithms that arrange elements in order." },
  { slug: "searching",       label: "Searching",         description: "Algorithms that find elements in a collection." },
  { slug: "data-structures", label: "Data Structures",   description: "Ways to organise and store data efficiently." },
  { slug: "graphs",          label: "Graph Algorithms",  description: "Algorithms for traversing and analysing graphs." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
