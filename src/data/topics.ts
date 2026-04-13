export type Level = "podstawy" | "sredni" | "zaawansowany";
export type Difficulty = "podstawowy" | "sredniozaawansowany" | "zaawansowany";
export type Category =
  | "wbudowane"
  | "liniowe"
  | "kolejki"
  | "listy"
  | "drzewa"
  | "grafy"
  | "zbiory"
  | "sortowanie"
  | "wyszukiwanie"
  | "zakresy";

export interface Topic {
  slug: string;
  title: string;       // Polish
  subtitle: string;    // English technical name
  description: string; // Polish
  level: Level;
  order: number;       // global sequence for learning path
  category: Category;
  difficulty: Difficulty;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  code: string;        // English
  explanation: string; // Polish
  steps: string[];     // Polish
}

export const topics: Topic[] = [
  // ──────────────────────────────────────────────────────────
  // PODSTAWY
  // ──────────────────────────────────────────────────────────
  {
    slug: "napis",
    title: "Napis (String)",
    subtitle: "String / str",
    description: "Niemutowalna sekwencja znaków — podstawa przetwarzania tekstu.",
    level: "podstawy",
    order: 1,
    category: "wbudowane",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Łańcuch znaków (string) to niemutowalna sekwencja znaków. W Pythonie `str` wspiera indeksowanie, wycinanie i iterację, przez co często traktuje się go jak tablicę znaków. Niemutowalność oznacza, że każda modyfikacja tworzy nowy obiekt — warto o tym pamiętać przy konkatenacji w pętli.",
    steps: [
      "Dostęp do znaku przez indeks działa w O(1).",
      "Wycinanie (slicing) zwraca nowy napis w O(k), gdzie k to długość wycinka.",
      "Szukanie podnapisu metodą `in` lub `find` to O(n·m) naiwnie.",
      "Odwrócenie przez `s[::-1]` to O(n).",
    ],
    code: `# String as a data structure
s = "hello, world"

# Indexing — O(1)
print(s[0])        # 'h'
print(s[-1])       # 'd'

# Slicing — O(k)
print(s[0:5])      # 'hello'
print(s[::-1])     # 'dlrow ,olleh'

# Immutability: strings cannot be mutated in-place
# s[0] = 'H'  → TypeError

# Common operations
print(len(s))                    # 12
print(s.upper())                 # 'HELLO, WORLD'
print(s.split(", "))             # ['hello', 'world']
print(", ".join(["a", "b"]))     # 'a, b'

# Efficient building: use a list, then join
parts = []
for ch in "abc":
    parts.append(ch.upper())
result = "".join(parts)          # 'ABC'

# Check palindrome — O(n)
def is_palindrome(s: str) -> bool:
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False

# Frequency count — O(n)
from collections import Counter
freq = Counter("mississippi")
print(freq.most_common(3))       # [('s', 4), ('i', 4), ('p', 2)]`,
  },
  {
    slug: "lista",
    title: "Lista (Tablica dynamiczna)",
    subtitle: "Dynamic Array / list",
    description: "Podstawowa struktura Pythona — dynamiczna tablica z dostępem losowym O(1).",
    level: "podstawy",
    order: 2,
    category: "wbudowane",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(1)*", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Lista to dynamiczna tablica — automatycznie podwaja rozmiar bufora przy przepełnieniu, zapewniając amortyzowane O(1) dla `append`. Dostęp losowy przez indeks to O(1). Wstawianie i usuwanie w środku wymaga przesunięcia elementów — O(n). Jest punktem wyjścia do nauki wszystkich innych struktur.",
    steps: [
      "append(x) dodaje element na koniec — amortyzowane O(1).",
      "insert(i, x) wstawia w pozycji i — O(n) przez przesunięcie.",
      "pop() usuwa z końca — O(1). pop(i) usuwa z pozycji i — O(n).",
      "Wzorzec dwóch wskaźników (two pointers) i okno przesuwne (sliding window) bazują na liście.",
    ],
    code: `# Dynamic Array (list) — Python built-in
arr: list[int] = []

# Append — O(1) amortised
arr.append(1); arr.append(2); arr.append(3)
print(arr)           # [1, 2, 3]

# Insert at index — O(n)
arr.insert(1, 99)
print(arr)           # [1, 99, 2, 3]

# Remove — O(n)
arr.remove(99)

# Pop from end — O(1)
last = arr.pop()     # 3

# Slice — O(k)
nums = list(range(6))
print(nums[1:4])     # [1, 2, 3]
print(nums[::-1])    # [5, 4, 3, 2, 1, 0]

# List comprehension
squares = [x ** 2 for x in range(6)]
print(squares)       # [0, 1, 4, 9, 16, 25]

# ── Two-pointer pattern ────────────────────────────────────
def two_sum_sorted(arr: list[int], target: int) -> tuple[int, int] | None:
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        s = arr[lo] + arr[hi]
        if s == target:   return lo, hi
        elif s < target:  lo += 1
        else:             hi -= 1
    return None

print(two_sum_sorted([1, 2, 3, 4, 6], 6))  # (1, 3)

# ── Sliding window: max sum of length k ───────────────────
def max_sum_window(arr: list[int], k: int) -> int:
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]
        best = max(best, window)
    return best

print(max_sum_window([2, 1, 5, 1, 3, 2], 3))  # 9`,
  },
  {
    slug: "krotka",
    title: "Krotka",
    subtitle: "Tuple",
    description: "Niemutowalna sekwencja — szybsza od listy, może być kluczem słownika.",
    level: "podstawy",
    order: 3,
    category: "wbudowane",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Krotka to niemutowalna sekwencja elementów — po utworzeniu nie można jej modyfikować. Zajmuje mniej pamięci niż lista i jest nieco szybsza przy iteracji. Dzięki niemutowalności może służyć jako klucz słownika lub element zbioru. Przydatna do zwracania wielu wartości z funkcji i grupowania powiązanych danych.",
    steps: [
      "Tworzy się nawiasami okrągłymi lub bez nich: `t = 1, 2, 3`.",
      "Dostęp przez indeks: O(1). Iteracja: O(n).",
      "Rozpakowywanie (unpacking) pozwala przypisać elementy do zmiennych.",
      "namedtuple daje krotkę z nazwanymi polami — czytelność bez narzutu klas.",
    ],
    code: `from collections import namedtuple

# Basic tuple
point = (3, 4)
x, y = point          # unpacking
print(x, y)           # 3 4

# Single-element tuple needs a trailing comma
single = (42,)
print(type(single))   # <class 'tuple'>

# Tuples as dict keys (lists cannot be keys)
distances: dict[tuple[int, int], float] = {}
distances[(0, 0)] = 0.0
distances[(1, 2)] = 2.24

# Tuple unpacking in loops
pairs = [(1, "a"), (2, "b"), (3, "c")]
for num, letter in pairs:
    print(num, letter)

# Named tuple — readable record type
Point3D = namedtuple("Point3D", ["x", "y", "z"])
p = Point3D(1, 2, 3)
print(p.x, p.y, p.z)  # 1 2 3
print(p)               # Point3D(x=1, y=2, z=3)

# Returning multiple values (implicitly a tuple)
def min_max(arr: list[int]) -> tuple[int, int]:
    return min(arr), max(arr)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(lo, hi)          # 1 9

# Swap without temp variable (tuple unpacking)
a, b = 10, 20
a, b = b, a
print(a, b)            # 20 10`,
  },
  {
    slug: "slownik",
    title: "Słownik (Mapa hash)",
    subtitle: "Hash Map / dict",
    description: "Mapa klucz-wartość z dostępem O(1) — jedna z najważniejszych struktur Pythona.",
    level: "podstawy",
    order: 4,
    category: "wbudowane",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Słownik to mapa haszująca przechowująca pary klucz-wartość z dostępem w O(1). Wewnętrznie używa tablicy mieszającej — przy kolizjach czas może wzrosnąć do O(n), ale zdarza się to rzadko. Najczęstszy wzorzec: liczenie częstości, memoizacja, grupowanie danych.",
    steps: [
      "Wstawianie i odczyt klucza: O(1) średnio.",
      "`get(key, default)` bezpiecznie pobiera wartość bez KeyError.",
      "`defaultdict` automatycznie tworzy wartość domyślną dla nowych kluczy.",
      "`Counter` to specjalizowany słownik do zliczania.",
    ],
    code: `from collections import defaultdict, Counter

# Basic operations — O(1) average
d: dict[str, int] = {}
d["a"] = 1
d["b"] = 2
print(d.get("a"))        # 1
print(d.get("z", 0))     # 0 (default)
del d["b"]

# Iteration
d = {"x": 10, "y": 20, "z": 30}
for key, value in d.items():
    print(key, value)

# ── Frequency count ────────────────────────────────────────
def char_freq(s: str) -> dict[str, int]:
    freq: dict[str, int] = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    return freq

print(char_freq("hello"))   # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Same thing with Counter
c = Counter("hello")
print(c.most_common(2))     # [('l', 2), ('h', 1)]

# ── defaultdict: group anagrams ───────────────────────────
def group_anagrams(words: list[str]) -> list[list[str]]:
    groups: dict[tuple, list[str]] = defaultdict(list)
    for word in words:
        key = tuple(sorted(word))
        groups[key].append(word)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

# ── Memoisation (top-down DP) ─────────────────────────────
def fib(n: int, memo: dict[int, int] = {}) -> int:
    if n <= 1: return n
    if n not in memo:
        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

print(fib(50))   # 12586269025`,
  },
  {
    slug: "zbior",
    title: "Zbiór",
    subtitle: "Hash Set / set",
    description: "Kolekcja unikalnych elementów z operacjami zbiorowymi w O(1).",
    level: "podstawy",
    order: 5,
    category: "wbudowane",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Zbiór to kolekcja unikalnych elementów oparta na tablicy haszującej — tak jak klucze słownika. Sprawdzanie przynależności (`in`), dodawanie i usuwanie działają w O(1). Idealny do eliminacji duplikatów, sprawdzania odwiedzonych wierzchołków w grafach i operacji zbiorów (suma, iloczyn, różnica).",
    steps: [
      "`add(x)` dodaje element — O(1). `remove(x)` usuwa — O(1).",
      "`x in s` sprawdza przynależność — O(1).",
      "Operacje: `|` (suma), `&` (iloczyn), `-` (różnica), `^` (różnica symetryczna).",
      "`frozenset` to niemutowalny zbiór, który można użyć jako klucz słownika.",
    ],
    code: `# Hash Set — O(1) add/remove/lookup
s: set[int] = set()
s.add(1); s.add(2); s.add(3); s.add(2)
print(s)           # {1, 2, 3}  — no duplicates

# Membership — O(1)
print(2 in s)      # True
print(9 in s)      # False

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)       # {1, 2, 3, 4, 5, 6}  union
print(a & b)       # {3, 4}               intersection
print(a - b)       # {1, 2}               difference
print(a ^ b)       # {1, 2, 5, 6}         symmetric difference

# ── Deduplicate while preserving order ────────────────────
def unique_ordered(arr: list[int]) -> list[int]:
    seen: set[int] = set()
    return [x for x in arr if not (x in seen or seen.add(x))]  # type: ignore

print(unique_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5]))
# [3, 1, 4, 5, 9, 2, 6]

# ── Check if two strings are anagrams ─────────────────────
def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)   # or: sorted(s) == sorted(t)

from collections import Counter
print(is_anagram("anagram", "nagaram"))  # True

# ── Longest substring without repeating chars ─────────────
def length_of_longest_substring(s: str) -> int:
    seen: set[str] = set()
    lo = best = 0
    for hi, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[lo]); lo += 1
        seen.add(ch)
        best = max(best, hi - lo + 1)
    return best

print(length_of_longest_substring("abcabcbb"))  # 3`,
  },
  {
    slug: "stos",
    title: "Stos",
    subtitle: "Stack (LIFO)",
    description: "Struktura LIFO — ostatni dodany element jest pierwszym usuniętym.",
    level: "podstawy",
    order: 6,
    category: "liniowe",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    explanation:
      "Stos to struktura LIFO (Last In, First Out) — ostatni element dodany jest pierwszym usuniętym. Naturalnie modeluje historię cofania (undo), wywołania funkcji (call stack) i algorytmy przeszukiwania w głąb. W Pythonie implementowany przez listę z operacjami `append`/`pop`.",
    steps: [
      "push: dodaj element na szczyt stosu — O(1).",
      "pop: usuń i zwróć element ze szczytu — O(1).",
      "peek/top: odczytaj szczyt bez usuwania — O(1).",
      "Typowe zastosowania: nawiasy wyważone, cofanie operacji, DFS.",
    ],
    code: `# Stack using Python list (append/pop are O(1))
stack: list[int] = []

stack.append(1)   # push
stack.append(2)
stack.append(3)
print(stack)       # [1, 2, 3]

top = stack[-1]    # peek — O(1)
print(top)         # 3

popped = stack.pop()  # pop — O(1)
print(popped)      # 3
print(stack)       # [1, 2]

# ── OOP wrapper ───────────────────────────────────────────
class Stack:
    def __init__(self): self._data: list = []
    def push(self, x) -> None: self._data.append(x)
    def pop(self): return self._data.pop()
    def peek(self): return self._data[-1]
    def is_empty(self) -> bool: return not self._data
    def __len__(self) -> int: return len(self._data)

# ── Classic problem: balanced brackets ────────────────────
def is_balanced(s: str) -> bool:
    stack: list[str] = []
    matching = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in ")]}":
            if not stack or stack[-1] != matching[ch]:
                return False
            stack.pop()
    return not stack

print(is_balanced("({[]})"))   # True
print(is_balanced("({[})"))    # False

# ── Evaluate Reverse Polish Notation ──────────────────────
def eval_rpn(tokens: list[str]) -> int:
    stack: list[int] = []
    ops = {"+": int.__add__, "-": int.__sub__,
           "*": int.__mul__, "/": lambda a, b: int(a / b)}
    for t in tokens:
        if t in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack[0]

print(eval_rpn(["2","1","+","3","*"]))  # 9`,
  },
  {
    slug: "kolejka",
    title: "Kolejka (FIFO)",
    subtitle: "Queue (FIFO)",
    description: "Struktura FIFO — pierwszy dodany element jest pierwszym usuniętym.",
    level: "podstawy",
    order: 7,
    category: "liniowe",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    explanation:
      "Kolejka to struktura FIFO (First In, First Out) — pierwszy dodany element jest pierwszym usuniętym. Używana w algorytmach BFS, obsłudze zadań i systemach kolejkowania. Najefektywniej implementowana przez `collections.deque` — `appendleft`/`pop` działają w O(1).",
    steps: [
      "enqueue: dodaj element na koniec kolejki — O(1).",
      "dequeue: usuń element z początku — O(1).",
      "front/peek: odczytaj pierwszy element bez usuwania — O(1).",
      "Użyj `collections.deque`, nie `list` (list.pop(0) to O(n)).",
    ],
    code: `from collections import deque

# Queue using deque — both ends O(1)
q: deque[int] = deque()

q.append(1)      # enqueue
q.append(2)
q.append(3)
print(q)          # deque([1, 2, 3])

front = q[0]      # peek — O(1)
print(front)      # 1

item = q.popleft()  # dequeue — O(1)
print(item)       # 1
print(q)          # deque([2, 3])

# ── OOP wrapper ───────────────────────────────────────────
class Queue:
    def __init__(self): self._data: deque = deque()
    def enqueue(self, x) -> None: self._data.append(x)
    def dequeue(self): return self._data.popleft()
    def front(self): return self._data[0]
    def is_empty(self) -> bool: return not self._data
    def __len__(self) -> int: return len(self._data)

# ── BFS shortest path in unweighted graph ─────────────────
def bfs_distance(graph: dict[int, list[int]], start: int, end: int) -> int:
    if start == end: return 0
    visited = {start}
    q: deque[tuple[int, int]] = deque([(start, 0)])
    while q:
        node, dist = q.popleft()
        for nb in graph[node]:
            if nb == end:
                return dist + 1
            if nb not in visited:
                visited.add(nb)
                q.append((nb, dist + 1))
    return -1   # unreachable

graph = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}
print(bfs_distance(graph, 0, 3))  # 2`,
  },
  {
    slug: "deque",
    title: "Deque (kolejka dwustronna)",
    subtitle: "Double-Ended Queue",
    description: "Kolejka dwustronna — O(1) na obu końcach. Ogólniejsza niż stos i kolejka.",
    level: "podstawy",
    order: 8,
    category: "liniowe",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    explanation:
      "Deque (double-ended queue) umożliwia dodawanie i usuwanie elementów z obu końców w O(1). Jest ogólniejsza niż stos (tylko jeden koniec) i kolejka (jeden kierunek). Python's `collections.deque` to zoptymalizowana implementacja oparta na liście dwukierunkowej. Kluczowa w wzorcu okna przesuwnego z maksimum.",
    steps: [
      "appendleft/popleft operują na początku — O(1).",
      "append/pop operują na końcu — O(1).",
      "maxlen ogranicza rozmiar — stary element automatycznie wypada.",
      "Wzorzec: sliding window maximum w O(n).",
    ],
    code: `from collections import deque

d: deque[int] = deque()

d.append(1)        # add right
d.append(2)
d.appendleft(0)    # add left
print(d)           # deque([0, 1, 2])

d.pop()            # remove right → 2
d.popleft()        # remove left  → 0
print(d)           # deque([1])

# Bounded deque — automatically discards from opposite end
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
print(recent)      # deque([2, 3, 4], maxlen=3)

# ── Sliding Window Maximum — O(n) ─────────────────────────
def sliding_window_max(nums: list[int], k: int) -> list[int]:
    """
    For each window of size k, return the maximum.
    Deque stores *indices* of useful elements in decreasing order of value.
    """
    dq: deque[int] = deque()   # stores indices
    result: list[int] = []

    for i, x in enumerate(nums):
        # Remove indices outside the window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove indices whose values are smaller than current
        while dq and nums[dq[-1]] < x:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

print(sliding_window_max([1, 3, -1, -3, 5, 3, 6, 7], k=3))
# [3, 3, 5, 5, 6, 7]`,
  },
  {
    slug: "kopiec",
    title: "Kopiec (kolejka priorytetowa)",
    subtitle: "Heap / Priority Queue",
    description: "Drzewo binarne utrzymujące minimum (lub maksimum) na szczycie — O(log n) insert/remove.",
    level: "podstawy",
    order: 9,
    category: "kolejki",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Kopiec (heap) to binarne drzewo spełniające własność kopca: każdy węzeł jest mniejszy (min-heap) lub większy (max-heap) od swoich dzieci. Szukanie minimum/maksimum: O(1). Wstawianie i usuwanie: O(log n). Python's `heapq` implementuje min-heap; dla max-heap wystarczy zanegować wartości.",
    steps: [
      "heapq.heappush(h, x): wstaw element — O(log n).",
      "heapq.heappop(h): usuń i zwróć minimum — O(log n).",
      "h[0]: podejrzyj minimum bez usuwania — O(1).",
      "heapq.heapify(list): zbuduj kopiec w miejscu — O(n).",
    ],
    code: `import heapq

# Min-heap
h: list[int] = []
heapq.heappush(h, 5)
heapq.heappush(h, 1)
heapq.heappush(h, 3)

print(h[0])           # 1  — peek minimum O(1)
print(heapq.heappop(h))  # 1  — pop minimum O(log n)
print(h)              # [3, 5]

# Build from list — O(n)
data = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(data)
print(data[0])        # 1

# Max-heap: negate values
max_h: list[int] = []
for x in [3, 1, 4, 1, 5]:
    heapq.heappush(max_h, -x)
print(-heapq.heappop(max_h))  # 5

# ── Top K frequent elements ────────────────────────────────
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    freq = Counter(nums)
    # heapq.nlargest uses a heap internally — O(n log k)
    return [x for x, _ in heapq.nlargest(k, freq.items(), key=lambda p: p[1])]

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]

# ── K-th smallest in sorted matrix ───────────────────────
def kth_smallest(matrix: list[list[int]], k: int) -> int:
    n = len(matrix)
    # Push (value, row, col) — start with first column
    heap = [(matrix[i][0], i, 0) for i in range(n)]
    heapq.heapify(heap)
    for _ in range(k):
        val, r, c = heapq.heappop(heap)
        if c + 1 < n:
            heapq.heappush(heap, (matrix[r][c + 1], r, c + 1))
    return val`,
  },
  {
    slug: "wyszukiwanie-liniowe",
    title: "Wyszukiwanie liniowe",
    subtitle: "Linear Search",
    description: "Najprostszy algorytm wyszukiwania — skanuje elementy jeden po drugim.",
    level: "podstawy",
    order: 10,
    category: "wyszukiwanie",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    explanation:
      "Wyszukiwanie liniowe sprawdza każdy element tablicy po kolei. Działa na nieposortowanych danych i nie wymaga preprocessingu. Złożoność O(n) czyni je nieefektywnym dla dużych zbiorów, ale jest bezpiecznym wyborem gdy dane są małe lub nieposortowane.",
    steps: [
      "Przejdź przez każdy element tablicy od początku.",
      "Porównaj z szukaną wartością.",
      "Zwróć indeks jeśli znaleziono, -1 jeśli nie.",
    ],
    code: `def linear_search(arr: list[int], target: int) -> int:
    """Return index of target or -1 if not found."""
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1

arr = [4, 2, 7, 1, 9, 3]
print(linear_search(arr, 9))   # 4
print(linear_search(arr, 5))   # -1

# Find ALL occurrences
def find_all(arr: list[int], target: int) -> list[int]:
    return [i for i, v in enumerate(arr) if v == target]

print(find_all([1, 3, 1, 4, 1], 1))   # [0, 2, 4]

# Find first element satisfying a condition
def find_first(arr: list[int], predicate) -> int | None:
    for x in arr:
        if predicate(x):
            return x
    return None

print(find_first([3, 1, 5, 2, 8], lambda x: x > 4))  # 5`,
  },
  {
    slug: "wyszukiwanie-binarne",
    title: "Wyszukiwanie binarne",
    subtitle: "Binary Search",
    description: "Wyszukiwanie w posortowanej tablicy przez eliminację połowy kandydatów — O(log n).",
    level: "podstawy",
    order: 11,
    category: "wyszukiwanie",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    explanation:
      "Wyszukiwanie binarne działa na posortowanych tablicach: za każdym krokiem porównuje środkowy element z szukaną wartością i eliminuje połowę kandydatów. Osiąga O(log n) — dla miliona elementów potrzeba co najwyżej 20 porównań. Wymaga posortowanych danych, ale jest fundamentalnym algorytmem.",
    steps: [
      "Ustaw lo = 0, hi = len(arr) - 1.",
      "Oblicz mid = (lo + hi) // 2.",
      "Jeśli arr[mid] == target: zwróć mid.",
      "Jeśli arr[mid] < target: lo = mid + 1. W przeciwnym razie hi = mid - 1.",
      "Powtarzaj aż lo > hi.",
    ],
    code: `def binary_search(arr: list[int], target: int) -> int:
    """Return index of target in sorted arr, or -1."""
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:   return mid
        elif arr[mid] < target:  lo = mid + 1
        else:                    hi = mid - 1
    return -1

arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))    # 3
print(binary_search(arr, 6))    # -1

# ── Leftmost occurrence ────────────────────────────────────
def search_left(arr: list[int], target: int) -> int:
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < target: lo = mid + 1
        else:                 hi = mid
    return lo if lo < len(arr) and arr[lo] == target else -1

print(search_left([1, 2, 2, 2, 3], 2))   # 1

# ── Search in rotated sorted array ────────────────────────
def search_rotated(arr: list[int], target: int) -> int:
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target: return mid
        if arr[lo] <= arr[mid]:          # left half is sorted
            if arr[lo] <= target < arr[mid]: hi = mid - 1
            else:                            lo = mid + 1
        else:                            # right half is sorted
            if arr[mid] < target <= arr[hi]: lo = mid + 1
            else:                            hi = mid - 1
    return -1

print(search_rotated([4, 5, 6, 7, 0, 1, 2], 0))  # 4`,
  },
  {
    slug: "sortowanie-babelkowe",
    title: "Sortowanie bąbelkowe",
    subtitle: "Bubble Sort",
    description: "Prosty algorytm porównawczy — zamienia sąsiednie elementy w złej kolejności.",
    level: "podstawy",
    order: 12,
    category: "sortowanie",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    explanation:
      "Sortowanie bąbelkowe wielokrotnie przechodzi przez tablicę, zamieniając sąsiadujące elementy w złej kolejności. Każdy pełny przebieg 'wypycha' największy niesortowany element na właściwe miejsce. Optymalizacja z flagą `swapped` pozwala zakończyć w O(n) gdy tablica jest już posortowana.",
    steps: [
      "Dla każdego przejścia i od 0 do n-1:",
      "Porównaj każdą parę sąsiednich elementów.",
      "Zamień je jeśli są w złej kolejności.",
      "Jeśli żadna zamiana nie nastąpiła — tablica jest posortowana (early exit).",
    ],
    code: `def bubble_sort(arr: list[int]) -> list[int]:
    arr = arr.copy()
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break   # already sorted — O(n) best case
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# [11, 12, 22, 25, 34, 64, 90]`,
  },
  {
    slug: "sortowanie-przez-wstawianie",
    title: "Sortowanie przez wstawianie",
    subtitle: "Insertion Sort",
    description: "Buduje posortowaną tablicę element po elemencie — wydajne dla małych i prawie posortowanych danych.",
    level: "podstawy",
    order: 13,
    category: "sortowanie",
    difficulty: "podstawowy",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    explanation:
      "Sortowanie przez wstawianie traktuje tablicę jak karty w ręce: bierze kolejny element i wsuwa go w odpowiednie miejsce w już posortowanej części. Efektywne dla małych i prawie posortowanych danych — w takich przypadkach osiąga prawie O(n). Działa online — może sortować dane napływające na bieżąco.",
    steps: [
      "Zacznij od drugiego elementu (indeks 1).",
      "Zapamiętaj aktualny element jako `key`.",
      "Przesuwaj większe elementy o jedną pozycję w prawo.",
      "Wstaw `key` w zwolnione miejsce.",
    ],
    code: `def insertion_sort(arr: list[int]) -> list[int]:
    arr = arr.copy()
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print(insertion_sort([12, 11, 13, 5, 6]))
# [5, 6, 11, 12, 13]

# Insertion sort is adaptive — nearly sorted data is very fast
import random
nearly_sorted = list(range(1000))
# swap a few pairs
for _ in range(5):
    i = random.randint(0, 998)
    nearly_sorted[i], nearly_sorted[i+1] = nearly_sorted[i+1], nearly_sorted[i]

result = insertion_sort(nearly_sorted)
print(result[:5])   # [0, 1, 2, 3, 4] — sorted correctly`,
  },

  // ──────────────────────────────────────────────────────────
  // ŚREDNI
  // ──────────────────────────────────────────────────────────
  {
    slug: "sortowanie-przez-scalanie",
    title: "Sortowanie przez scalanie",
    subtitle: "Merge Sort",
    description: "Gwarantowane O(n log n) — algorytm dziel i zwyciężaj, stabilny.",
    level: "sredni",
    order: 14,
    category: "sortowanie",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Sortowanie przez scalanie rekurencyjnie dzieli tablicę na połowy, sortuje je niezależnie, a następnie scala posortowane części. Każdy poziom rekursji wykonuje O(n) pracy, poziomów jest O(log n) — całość to O(n log n). Jest stabilny (zachowuje kolejność równych elementów) i przewidywalny.",
    steps: [
      "Jeśli tablica ma ≤ 1 elementów: zwróć ją.",
      "Podziel tablicę na pół: left = arr[:mid], right = arr[mid:].",
      "Rekurencyjnie posortuj left i right.",
      "Scal dwie posortowane tablice w jedną.",
    ],
    code: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return _merge(left, right)

def _merge(left: list[int], right: list[int]) -> list[int]:
    result: list[int] = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# [3, 9, 10, 27, 38, 43, 82]

# ── Count inversions (merge sort variant) ─────────────────
def count_inversions(arr: list[int]) -> tuple[list[int], int]:
    if len(arr) <= 1:
        return arr, 0
    mid = len(arr) // 2
    left,  lc = count_inversions(arr[:mid])
    right, rc = count_inversions(arr[mid:])
    merged, sc = _merge_count(left, right)
    return merged, lc + rc + sc

def _merge_count(left: list[int], right: list[int]) -> tuple[list[int], int]:
    result: list[int] = []
    inversions = i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            inversions += len(left) - i   # all remaining in left > right[j]
            result.append(right[j]); j += 1
    result.extend(left[i:]); result.extend(right[j:])
    return result, inversions

_, inv = count_inversions([3, 1, 2, 4])
print(inv)   # 2  (pairs: (3,1), (3,2))`,
  },
  {
    slug: "sortowanie-szybkie",
    title: "Sortowanie szybkie",
    subtitle: "Quick Sort",
    description: "Szybki algorytm dziel i zwyciężaj z losowym pivotem — O(n log n) średnio.",
    level: "sredni",
    order: 15,
    category: "sortowanie",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    explanation:
      "Sortowanie szybkie wybiera element osiowy (pivot) i reorganizuje tablicę: mniejsze elementy trafiają po lewej, większe po prawej. Rekurencyjnie sortuje obie części. Losowy pivot sprawia, że najgorszy przypadek O(n²) jest praktycznie niemożliwy. Działa in-place i ma małe stałe — w praktyce często szybsze niż Merge Sort.",
    steps: [
      "Wybierz losowy pivot.",
      "Partycjonuj: elementy < pivot po lewej, > pivot po prawej.",
      "Rekurencyjnie posortuj lewą i prawą część.",
    ],
    code: `import random

def quick_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = random.choice(arr)
    less    = [x for x in arr if x <  pivot]
    equal   = [x for x in arr if x == pivot]
    greater = [x for x in arr if x >  pivot]
    return quick_sort(less) + equal + quick_sort(greater)

print(quick_sort([10, 7, 8, 9, 1, 5]))
# [1, 5, 7, 8, 9, 10]

# ── In-place Lomuto partition (space efficient) ─────────────
def quick_sort_inplace(arr: list[int], lo: int = 0, hi: int | None = None) -> None:
    if hi is None: hi = len(arr) - 1
    if lo >= hi: return
    pivot_idx = _partition(arr, lo, hi)
    quick_sort_inplace(arr, lo, pivot_idx - 1)
    quick_sort_inplace(arr, pivot_idx + 1, hi)

def _partition(arr: list[int], lo: int, hi: int) -> int:
    # Randomise pivot to avoid O(n²) on sorted input
    rand = random.randint(lo, hi)
    arr[rand], arr[hi] = arr[hi], arr[rand]
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
    return i + 1

data = [10, 7, 8, 9, 1, 5]
quick_sort_inplace(data)
print(data)   # [1, 5, 7, 8, 9, 10]

# ── Quickselect — k-th smallest in O(n) average ──────────
def quickselect(arr: list[int], k: int) -> int:
    """Return k-th smallest element (0-indexed)."""
    arr = arr.copy()
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        pivot_idx = _partition(arr, lo, hi)
        if pivot_idx == k:   return arr[k]
        elif pivot_idx < k:  lo = pivot_idx + 1
        else:                hi = pivot_idx - 1
    return arr[lo]

print(quickselect([3, 1, 4, 1, 5, 9, 2], 3))  # 3 (4th smallest)`,
  },
  {
    slug: "lista-jednokierunkowa",
    title: "Lista jednokierunkowa",
    subtitle: "Singly Linked List",
    description: "Sekwencja węzłów — każdy wskazuje na następny. Wstawianie na początku O(1).",
    level: "sredni",
    order: 16,
    category: "listy",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Lista jednokierunkowa to sekwencja węzłów, gdzie każdy zawiera wartość i wskaźnik na następny węzeł. Wstawianie i usuwanie na początku jest O(1). Dostęp do elementu po indeksie wymaga przejścia O(n). Podstawa dla stosu, kolejki i wielu innych struktur.",
    steps: [
      "Każdy węzeł (Node) przechowuje `data` i `next`.",
      "Wskaźnik `head` wskazuje na pierwszy węzeł.",
      "Traversal: przechodzimy od head do węzła z next == None.",
      "Usuwanie węzła wymaga wskaźnika do poprzednika.",
    ],
    code: `from __future__ import annotations

class Node:
    def __init__(self, data: int):
        self.data = data
        self.next: Node | None = None

class LinkedList:
    def __init__(self):
        self.head: Node | None = None

    def prepend(self, data: int) -> None:      # O(1)
        node = Node(data)
        node.next = self.head
        self.head = node

    def append(self, data: int) -> None:       # O(n)
        node = Node(data)
        if not self.head:
            self.head = node; return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node

    def delete(self, data: int) -> None:       # O(n)
        if not self.head: return
        if self.head.data == data:
            self.head = self.head.next; return
        cur = self.head
        while cur.next and cur.next.data != data:
            cur = cur.next
        if cur.next:
            cur.next = cur.next.next

    def to_list(self) -> list[int]:
        result, cur = [], self.head
        while cur:
            result.append(cur.data); cur = cur.next
        return result

    # ── Reverse in-place — O(n) ───────────────────────────
    def reverse(self) -> None:
        prev: Node | None = None
        cur = self.head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        self.head = prev

    # ── Detect cycle (Floyd's algorithm) ─────────────────
    def has_cycle(self) -> bool:
        slow = fast = self.head
        while fast and fast.next:
            slow = slow.next          # type: ignore
            fast = fast.next.next     # type: ignore
            if slow is fast:
                return True
        return False

ll = LinkedList()
for v in [1, 2, 3, 4, 5]:
    ll.append(v)
print(ll.to_list())   # [1, 2, 3, 4, 5]
ll.reverse()
print(ll.to_list())   # [5, 4, 3, 2, 1]
ll.delete(3)
print(ll.to_list())   # [5, 4, 2, 1]`,
  },
  {
    slug: "lista-dwukierunkowa",
    title: "Lista dwukierunkowa",
    subtitle: "Doubly Linked List",
    description: "Lista z wskaźnikami w obu kierunkach — usuwanie dowolnego węzła O(1).",
    level: "sredni",
    order: 17,
    category: "listy",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Lista dwukierunkowa rozszerza listę jednokierunkową o wskaźnik `prev`. Pozwala na przechodzenie w obu kierunkach i usuwanie dowolnego węzła w O(1) przy danym wskaźniku do węzła. Jest fundamentem implementacji LRU Cache — w połączeniu ze słownikiem daje O(1) dla wszystkich operacji.",
    steps: [
      "Każdy węzeł ma `data`, `prev` i `next`.",
      "Utrzymuj wskaźniki `head` i `tail`.",
      "Wstawianie: aktualizuj cztery wskaźniki.",
      "Usuwanie: przepnij prev i next sąsiadów — O(1) przy danym węźle.",
    ],
    code: `from __future__ import annotations

class DNode:
    def __init__(self, key: int, val: int):
        self.key = key
        self.val = val
        self.prev: DNode | None = None
        self.next: DNode | None = None

# ── LRU Cache — O(1) get and put ──────────────────────────
class LRUCache:
    """
    Uses a doubly linked list + hash map.
    Most recently used → right of list (before tail sentinel).
    Least recently used → left of list (after head sentinel).
    """
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache: dict[int, DNode] = {}
        # Sentinel nodes — no edge cases on insert/delete
        self.head = DNode(0, 0)
        self.tail = DNode(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: DNode) -> None:
        node.prev.next = node.next   # type: ignore
        node.next.prev = node.prev   # type: ignore

    def _insert_right(self, node: DNode) -> None:
        prev = self.tail.prev
        prev.next = node             # type: ignore
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._insert_right(node)     # mark as most recent
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = DNode(key, value)
        self.cache[key] = node
        self._insert_right(node)
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)        # type: ignore
            del self.cache[lru.key]  # type: ignore

# Example
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))   # 1
cache.put(3, 3)       # evicts key 2
print(cache.get(2))   # -1 (evicted)
cache.put(4, 4)       # evicts key 1
print(cache.get(1))   # -1
print(cache.get(3))   # 3
print(cache.get(4))   # 4`,
  },
  {
    slug: "drzewo-binarne",
    title: "Drzewo binarne",
    subtitle: "Binary Tree",
    description: "Hierarchiczna struktura — każdy węzeł ma co najwyżej dwoje dzieci.",
    level: "sredni",
    order: 18,
    category: "drzewa",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Drzewo binarne to hierarchiczna struktura, gdzie każdy węzeł ma co najwyżej lewe i prawe dziecko. Trzy główne sposoby przechodzenia: preorder (korzeń→lewy→prawy), inorder (lewy→korzeń→prawy), postorder (lewy→prawy→korzeń). BFS pozwala przeglądać poziomami. Inorder BST zwraca elementy posortowane.",
    steps: [
      "Preorder (NLR): korzeń, potem lewy i prawy poddrzewo.",
      "Inorder (LNR): lewy, korzeń, prawy — posortowane dla BST.",
      "Postorder (LRN): lewy, prawy, korzeń — przydatne do usuwania.",
      "Level-order (BFS): poziom po poziomie przez kolejkę.",
    ],
    code: `from __future__ import annotations
from collections import deque

class TreeNode:
    def __init__(self, val: int):
        self.val = val
        self.left:  TreeNode | None = None
        self.right: TreeNode | None = None

# Build example tree:
#        1
#       / \\
#      2   3
#     / \\   \\
#    4   5   6
root = TreeNode(1)
root.left  = TreeNode(2); root.right = TreeNode(3)
root.left.left  = TreeNode(4)
root.left.right = TreeNode(5)
root.right.right = TreeNode(6)

# ── Traversals ────────────────────────────────────────────
def preorder(node: TreeNode | None) -> list[int]:
    if not node: return []
    return [node.val] + preorder(node.left) + preorder(node.right)

def inorder(node: TreeNode | None) -> list[int]:
    if not node: return []
    return inorder(node.left) + [node.val] + inorder(node.right)

def postorder(node: TreeNode | None) -> list[int]:
    if not node: return []
    return postorder(node.left) + postorder(node.right) + [node.val]

def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root: return []
    result, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result

print(preorder(root))    # [1, 2, 4, 5, 3, 6]
print(inorder(root))     # [4, 2, 5, 1, 3, 6]
print(level_order(root)) # [[1], [2, 3], [4, 5, 6]]

# ── Max depth ─────────────────────────────────────────────
def max_depth(node: TreeNode | None) -> int:
    if not node: return 0
    return 1 + max(max_depth(node.left), max_depth(node.right))

print(max_depth(root))   # 3`,
  },
  {
    slug: "drzewo-bst",
    title: "Binarne drzewo poszukiwań (BST)",
    subtitle: "Binary Search Tree",
    description: "Drzewo binarne z własnością BST: lewe < korzeń < prawe — O(log n) operacje.",
    level: "sredni",
    order: 19,
    category: "drzewa",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "BST zachowuje własność: dla każdego węzła, wszystkie wartości w lewym poddrzewie są mniejsze, a w prawym większe. Umożliwia wyszukiwanie, wstawianie i usuwanie w O(log n) średnio. Na zdegenerowanym drzewie (np. posortowane dane) operacje degradują do O(n) — stąd potrzeba drzew AVL/Red-Black.",
    steps: [
      "Wstawianie: idź w lewo jeśli val < node, w prawo jeśli val > node.",
      "Szukanie: analogicznie jak wstawianie.",
      "Inorder traversal zwraca posortowane elementy.",
      "Usuwanie z dwójką dzieci: zastąp następnikiem inorder (min prawego poddrzewa).",
    ],
    code: `from __future__ import annotations

class BSTNode:
    def __init__(self, val: int):
        self.val = val
        self.left: BSTNode | None = None
        self.right: BSTNode | None = None

class BST:
    def __init__(self): self.root: BSTNode | None = None

    # ── Insert — O(log n) avg ─────────────────────────────
    def insert(self, val: int) -> None:
        self.root = self._insert(self.root, val)

    def _insert(self, node: BSTNode | None, val: int) -> BSTNode:
        if not node: return BSTNode(val)
        if val < node.val:   node.left  = self._insert(node.left, val)
        elif val > node.val: node.right = self._insert(node.right, val)
        return node

    # ── Search — O(log n) avg ─────────────────────────────
    def search(self, val: int) -> bool:
        cur = self.root
        while cur:
            if val == cur.val:   return True
            elif val < cur.val:  cur = cur.left
            else:                cur = cur.right
        return False

    # ── Delete ────────────────────────────────────────────
    def delete(self, val: int) -> None:
        self.root = self._delete(self.root, val)

    def _delete(self, node: BSTNode | None, val: int) -> BSTNode | None:
        if not node: return None
        if val < node.val:
            node.left = self._delete(node.left, val)
        elif val > node.val:
            node.right = self._delete(node.right, val)
        else:
            if not node.left:  return node.right
            if not node.right: return node.left
            # two children: replace with inorder successor
            successor = node.right
            while successor.left:
                successor = successor.left
            node.val = successor.val
            node.right = self._delete(node.right, successor.val)
        return node

    def inorder(self) -> list[int]:
        res: list[int] = []
        def _dfs(n: BSTNode | None) -> None:
            if n: _dfs(n.left); res.append(n.val); _dfs(n.right)
        _dfs(self.root); return res

bst = BST()
for v in [5, 3, 7, 1, 4, 6, 8]:
    bst.insert(v)
print(bst.inorder())     # [1, 3, 4, 5, 6, 7, 8]
print(bst.search(4))     # True
bst.delete(3)
print(bst.inorder())     # [1, 4, 5, 6, 7, 8]`,
  },
  {
    slug: "graf",
    title: "Graf (lista sąsiedztwa)",
    subtitle: "Graph — Adjacency List",
    description: "Zbiór wierzchołków połączonych krawędziami — reprezentacja przez listy sąsiedztwa.",
    level: "sredni",
    order: 20,
    category: "grafy",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(1)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V+E)",
    explanation:
      "Graf to zbiór wierzchołków (V) i krawędzi (E). Lista sąsiedztwa przechowuje dla każdego wierzchołka listę jego sąsiadów — efektywna pamięciowo dla rzadkich grafów. Macierz sąsiedztwa jest szybsza przy sprawdzaniu istnienia krawędzi O(1), ale zajmuje O(V²). Grafy mogą być skierowane/nieskierowane i ważone/nieważone.",
    steps: [
      "Wierzchołki mogą być dowolnymi hashowalnymi obiektami (int, str).",
      "Krawędź nieskierowaną dodaje się obustronnie.",
      "BFS i DFS to dwa fundamentalne sposoby przeszukiwania.",
      "Wykrywanie cyklu: DFS z kolor. (biały/szary/czarny).",
    ],
    code: `from collections import defaultdict, deque

class Graph:
    def __init__(self, directed: bool = False):
        self.adj: dict[int, list[int]] = defaultdict(list)
        self.directed = directed

    def add_edge(self, u: int, v: int) -> None:
        self.adj[u].append(v)
        if not self.directed:
            self.adj[v].append(u)

    def vertices(self) -> set[int]:
        vs: set[int] = set(self.adj.keys())
        for nb_list in self.adj.values():
            vs.update(nb_list)
        return vs

    # ── BFS — O(V+E) ──────────────────────────────────────
    def bfs(self, start: int) -> list[int]:
        visited = {start}
        order: list[int] = []
        q = deque([start])
        while q:
            node = q.popleft()
            order.append(node)
            for nb in self.adj[node]:
                if nb not in visited:
                    visited.add(nb)
                    q.append(nb)
        return order

    # ── DFS — O(V+E) ──────────────────────────────────────
    def dfs(self, start: int) -> list[int]:
        visited: set[int] = set()
        order: list[int] = []
        def _dfs(v: int) -> None:
            visited.add(v); order.append(v)
            for nb in self.adj[v]:
                if nb not in visited:
                    _dfs(nb)
        _dfs(start)
        return order

    # ── Shortest path (unweighted) ────────────────────────
    def shortest_path(self, src: int, dst: int) -> list[int]:
        parent: dict[int, int | None] = {src: None}
        q = deque([src])
        while q:
            node = q.popleft()
            if node == dst:
                path = []
                while node is not None:
                    path.append(node)
                    node = parent[node]   # type: ignore
                return path[::-1]
            for nb in self.adj[node]:
                if nb not in parent:
                    parent[nb] = node
                    q.append(nb)
        return []   # unreachable

g = Graph()
for u, v in [(0,1),(0,2),(1,3),(2,3),(3,4)]:
    g.add_edge(u, v)
print(g.bfs(0))              # [0, 1, 2, 3, 4]
print(g.shortest_path(0, 4)) # [0, 1, 3, 4]`,
  },
  {
    slug: "trie",
    title: "Trie (drzewo prefiksowe)",
    subtitle: "Trie / Prefix Tree",
    description: "Drzewo gdzie każda ścieżka to prefiks słowa — szukanie po O(L).",
    level: "sredni",
    order: 21,
    category: "drzewa",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(L)", average: "O(L)", worst: "O(L)" },
    spaceComplexity: "O(N·L)",
    explanation:
      "Trie to drzewo, gdzie każda ścieżka od korzenia do węzła końcowego reprezentuje słowo. Wyszukiwanie działa w O(L) — gdzie L to długość słowa — niezależnie od liczby przechowywanych słów. Idealny do autouzupełniania, sprawdzania pisowni i wyszukiwania po prefiksach.",
    steps: [
      "Każdy węzeł ma słownik dzieci (znak → węzeł) i flagę `is_end`.",
      "insert(word): dla każdego znaku idź do (lub utwórz) dziecko.",
      "search(word): idź po znakach; True jeśli dojdziesz do `is_end`.",
      "starts_with(prefix): analogicznie ale bez sprawdzania `is_end`.",
    ],
    code: `from __future__ import annotations

class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:         # O(L)
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:         # O(L)
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end

    def starts_with(self, prefix: str) -> bool:  # O(L)
        node = self.root
        for ch in prefix:
            if ch not in node.children: return False
            node = node.children[ch]
        return True

    def words_with_prefix(self, prefix: str) -> list[str]:
        """Return all words that start with prefix."""
        node = self.root
        for ch in prefix:
            if ch not in node.children: return []
            node = node.children[ch]
        # DFS from here
        results: list[str] = []
        def dfs(n: TrieNode, path: str) -> None:
            if n.is_end: results.append(path)
            for ch, child in n.children.items():
                dfs(child, path + ch)
        dfs(node, prefix)
        return results

trie = Trie()
for w in ["apple", "app", "application", "apply", "banana"]:
    trie.insert(w)

print(trie.search("app"))         # True
print(trie.search("ap"))          # False
print(trie.starts_with("app"))    # True
print(trie.words_with_prefix("app"))
# ['app', 'apple', 'application', 'apply']`,
  },
  {
    slug: "union-find",
    title: "Union-Find (Rozłączne zbiory)",
    subtitle: "Disjoint Set Union (DSU)",
    description: "Struktura zarządzająca zbiorami rozłącznymi — union i find prawie O(1).",
    level: "sredni",
    order: 22,
    category: "zbiory",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(1)", average: "O(α(n))", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Union-Find zarządza zbiorami rozłącznymi. Operacja `find` zwraca reprezentanta zbioru (z kompresją ścieżki). Operacja `union` łączy dwa zbiory (według rangi). Złożoność O(α(n)) to odwrotna funkcja Ackermanna — praktycznie stała. Kluczowa struktura w algorytmie Kruskala (MST) i wykrywaniu cykli.",
    steps: [
      "Inicjalizacja: każdy element jest swoim własnym rodzicem.",
      "find(x): idź w górę do korzenia (z kompresją ścieżki).",
      "union(x, y): połącz drzewa według rangi (mniejsze pod większe).",
      "connected(x, y): sprawdź czy find(x) == find(y).",
    ],
    code: `class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank   = [0] * n
        self.components = n     # number of disjoint sets

    def find(self, x: int) -> int:
        # Path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Returns True if x and y were in different sets."""
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False
        # Union by rank
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        self.components -= 1
        return True

    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)

# Example
uf = UnionFind(6)
uf.union(0, 1)
uf.union(1, 2)
uf.union(3, 4)
print(uf.connected(0, 2))    # True
print(uf.connected(0, 3))    # False
print(uf.components)         # 3  (groups: {0,1,2}, {3,4}, {5})

# ── Detect cycle in undirected graph ──────────────────────
def has_cycle(n: int, edges: list[tuple[int, int]]) -> bool:
    uf = UnionFind(n)
    for u, v in edges:
        if not uf.union(u, v):
            return True     # already in same set → cycle
    return False

print(has_cycle(4, [(0,1),(1,2),(2,3),(3,1)]))  # True
print(has_cycle(4, [(0,1),(1,2),(2,3)]))         # False

# ── Kruskal's MST ─────────────────────────────────────────
def kruskal(n: int, edges: list[tuple[int, int, int]]) -> int:
    """Returns total weight of Minimum Spanning Tree."""
    uf = UnionFind(n)
    total = 0
    for w, u, v in sorted(edges):
        if uf.union(u, v):
            total += w
    return total

edges = [(1,0,1),(4,0,2),(3,1,2),(2,1,3),(5,2,3)]
print(kruskal(4, edges))   # 6`,
  },
  {
    slug: "stos-monotoniczny",
    title: "Stos monotoniczny",
    subtitle: "Monotonic Stack",
    description: "Stos utrzymujący elementy w porządku — O(n) dla problemów 'następny większy element'.",
    level: "sredni",
    order: 23,
    category: "liniowe",
    difficulty: "sredniozaawansowany",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Stos monotoniczny utrzymuje elementy w porządku rosnącym lub malejącym. Każdy element jest wstawiany i usuwany ze stosu co najwyżej raz — całość to O(n). Używany do problemów 'następny większy/mniejszy element', 'poprzedni większy/mniejszy element' i histogram problems.",
    steps: [
      "Przejdź przez tablicę od lewej do prawej.",
      "Dla stosu malejącego: zdejmuj elementy mniejsze od aktualnego.",
      "Każdy zdjęty element znalazł swój 'następny większy' — aktualny element.",
      "Elementy pozostałe na stosie nie mają większego następnika.",
    ],
    code: `# ── Next Greater Element — O(n) ───────────────────────────
def next_greater(nums: list[int]) -> list[int]:
    """For each element, find the next element that is greater."""
    n = len(nums)
    result = [-1] * n
    stack: list[int] = []  # stores indices

    for i, x in enumerate(nums):
        # Pop all indices whose value is smaller than current
        while stack and nums[stack[-1]] < x:
            idx = stack.pop()
            result[idx] = x
        stack.append(i)
    # Remaining elements have no greater element → -1
    return result

print(next_greater([2, 1, 2, 4, 3]))
# [4, 2, 4, -1, -1]

# ── Largest rectangle in histogram — O(n) ─────────────────
def largest_rectangle(heights: list[int]) -> int:
    stack: list[int] = []   # stores indices
    max_area = 0
    heights = heights + [0]  # sentinel

    for i, h in enumerate(heights):
        start = i
        while stack and heights[stack[-1]] > h:
            idx = stack.pop()
            width = i - (stack[-1] + 1 if stack else 0)
            max_area = max(max_area, heights[idx] * width)
            start = idx
        stack.append(start)

    return max_area

print(largest_rectangle([2, 1, 5, 6, 2, 3]))  # 10

# ── Daily Temperatures — O(n) ─────────────────────────────
def daily_temperatures(temps: list[int]) -> list[int]:
    """For each day, how many days until a warmer temperature?"""
    result = [0] * len(temps)
    stack: list[int] = []

    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)

    return result

print(daily_temperatures([73,74,75,71,69,72,76,73]))
# [1, 1, 4, 2, 1, 1, 0, 0]`,
  },

  // ──────────────────────────────────────────────────────────
  // ZAAWANSOWANY
  // ──────────────────────────────────────────────────────────
  {
    slug: "drzewo-przedzialowe",
    title: "Drzewo przedziałowe",
    subtitle: "Segment Tree",
    description: "Zapytania o przedziały (suma, min, max) i aktualizacje punktowe w O(log n).",
    level: "zaawansowany",
    order: 24,
    category: "zakresy",
    difficulty: "zaawansowany",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Drzewo przedziałowe pozwala na zapytania o przedziały (suma, minimum, maksimum) oraz aktualizacje punktowe w O(log n). Buduje się je w O(n). Przechowywane jako tablica o rozmiarze 4n. Używane gdy mamy wiele zapytań i aktualizacji na tej samej tablicy.",
    steps: [
      "Zbuduj drzewo rekurencyjnie (build): O(n).",
      "query(l, r): odpytaj przedział [l, r] — O(log n).",
      "update(i, val): zaktualizuj punkt i — O(log n).",
      "Liście = oryginalne elementy; węzły wewnętrzne = wyniki na poddrzewach.",
    ],
    code: `class SegmentTree:
    """Range sum query + point update — O(log n)."""
    def __init__(self, data: list[int]):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        self._build(data, 0, 0, self.n - 1)

    def _build(self, data: list[int], node: int, lo: int, hi: int) -> None:
        if lo == hi:
            self.tree[node] = data[lo]; return
        mid = (lo + hi) // 2
        self._build(data, 2*node+1, lo, mid)
        self._build(data, 2*node+2, mid+1, hi)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def update(self, idx: int, val: int) -> None:
        self._update(0, 0, self.n-1, idx, val)

    def _update(self, node: int, lo: int, hi: int, idx: int, val: int) -> None:
        if lo == hi:
            self.tree[node] = val; return
        mid = (lo + hi) // 2
        if idx <= mid: self._update(2*node+1, lo, mid, idx, val)
        else:          self._update(2*node+2, mid+1, hi, idx, val)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def query(self, l: int, r: int) -> int:
        return self._query(0, 0, self.n-1, l, r)

    def _query(self, node: int, lo: int, hi: int, l: int, r: int) -> int:
        if r < lo or hi < l: return 0           # out of range
        if l <= lo and hi <= r: return self.tree[node]  # fully inside
        mid = (lo + hi) // 2
        return (self._query(2*node+1, lo, mid, l, r) +
                self._query(2*node+2, mid+1, hi, l, r))

# Example
st = SegmentTree([1, 3, 5, 7, 9, 11])
print(st.query(1, 3))    # 15  (3+5+7)
st.update(2, 10)          # change index 2 to 10
print(st.query(1, 3))    # 20  (3+10+7)`,
  },
  {
    slug: "drzewo-fenwicka",
    title: "Drzewo Fenwicka (BIT)",
    subtitle: "Fenwick Tree / Binary Indexed Tree",
    description: "Elegancka struktura do sum prefiksowych z aktualizacją punktową — O(log n).",
    level: "zaawansowany",
    order: 25,
    category: "zakresy",
    difficulty: "zaawansowany",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    explanation:
      "Drzewo Fenwicka (BIT) to elegancka struktura do sum prefiksowych z aktualizacjami. Prostsze i szybsze w praktyce niż drzewo przedziałowe dla operacji sum prefiksowych. Każdy indeks i przechowuje sumę określonego zakresu opartego na binarnej reprezentacji i. Trik: `i & (-i)` izoluje ostatni ustawiony bit.",
    steps: [
      "Inicjalizacja: zbuduj przez n operacji update — O(n log n) lub O(n).",
      "update(i, delta): zaktualizuj punkt i i wszystkich przodków — O(log n).",
      "prefix_sum(i): suma od 1 do i — O(log n).",
      "range_sum(l, r) = prefix_sum(r) - prefix_sum(l-1).",
    ],
    code: `class FenwickTree:
    """
    1-indexed Fenwick Tree (BIT) for prefix sums.
    update(i, delta) and prefix_sum(i) in O(log n).
    """
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i: int, delta: int) -> None:
        """Add delta to position i (1-indexed)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)      # move to next responsible node

    def prefix_sum(self, i: int) -> int:
        """Sum of elements from index 1 to i."""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)      # move to parent
        return total

    def range_sum(self, l: int, r: int) -> int:
        """Sum from l to r (1-indexed, inclusive)."""
        return self.prefix_sum(r) - self.prefix_sum(l - 1)

    @classmethod
    def from_array(cls, arr: list[int]) -> "FenwickTree":
        """Build from 0-indexed array in O(n)."""
        ft = cls(len(arr))
        for i, x in enumerate(arr):
            ft.update(i + 1, x)
        return ft

# Example
ft = FenwickTree.from_array([1, 3, 5, 7, 9, 11])
print(ft.prefix_sum(3))      # 9   (1+3+5)
print(ft.range_sum(2, 5))    # 24  (3+5+7+9)
ft.update(3, 5)               # arr[2] += 5 → becomes 10
print(ft.range_sum(2, 5))    # 29  (3+10+7+9)

# ── Count inversions using BIT ─────────────────────────────
def count_inversions_bit(arr: list[int]) -> int:
    """Count pairs (i,j) where i<j but arr[i]>arr[j] — O(n log n)."""
    compressed = {v: i+1 for i, v in enumerate(sorted(set(arr)))}
    n = len(compressed)
    ft = FenwickTree(n)
    inversions = 0
    for x in reversed(arr):
        cx = compressed[x]
        inversions += ft.prefix_sum(cx - 1)
        ft.update(cx, 1)
    return inversions

print(count_inversions_bit([3, 1, 2, 4]))  # 2`,
  },
];

// ── Metadata ──────────────────────────────────────────────────
export const levels: { slug: Level; label: string; description: string; color: string }[] = [
  {
    slug: "podstawy",
    label: "Podstawy",
    description: "Wbudowane struktury Pythona, proste algorytmy — fundament każdego programisty.",
    color: "green",
  },
  {
    slug: "sredni",
    label: "Poziom Średni",
    description: "Listy połączone, drzewa, grafy, wzorce algorytmiczne — poziom rozmów rekrutacyjnych.",
    color: "yellow",
  },
  {
    slug: "zaawansowany",
    label: "Zaawansowany",
    description: "Drzewa przedziałowe, BIT, struktury zakresowe — do najtrudniejszych zadań.",
    color: "red",
  },
];

export const categories: { slug: Category; label: string }[] = [
  { slug: "wbudowane",    label: "Wbudowane struktury" },
  { slug: "liniowe",      label: "Struktury liniowe" },
  { slug: "kolejki",      label: "Kolejki priorytetowe" },
  { slug: "listy",        label: "Listy połączone" },
  { slug: "drzewa",       label: "Drzewa" },
  { slug: "grafy",        label: "Grafy" },
  { slug: "zbiory",       label: "Struktury zbiorów" },
  { slug: "zakresy",      label: "Struktury zakresowe" },
  { slug: "sortowanie",   label: "Algorytmy sortowania" },
  { slug: "wyszukiwanie", label: "Algorytmy wyszukiwania" },
];

export function getTopicsByLevel(level: Level): Topic[] {
  return topics.filter((t) => t.level === level).sort((a, b) => a.order - b.order);
}

export function getNextTopic(slug: string): Topic | undefined {
  const current = topics.find((t) => t.slug === slug);
  if (!current) return undefined;
  return topics.find((t) => t.order === current.order + 1);
}

export function getPrevTopic(slug: string): Topic | undefined {
  const current = topics.find((t) => t.slug === slug);
  if (!current) return undefined;
  return topics.find((t) => t.order === current.order - 1);
}
