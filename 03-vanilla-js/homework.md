# Homework — Vanilla JS DOM

## Instructions
- Create a single `index.html` file with all your code inside `<script>` tags (no external JS file needed).
- Do not use any libraries or frameworks — plain JavaScript only.
- Test everything in the browser console before submitting.

---

## Part 1 — The Document Object (intro)

1. Using `document.title`, change the page title to your full name.
2. Access the first `<script>` tag in the document using `document.head` or `document.body` and log its `src` attribute value (or tag name if there is no src) using `console.dir`.
3. Write a function called `introduce(greeting, name)` that receives two strings and logs them as a single sentence using a template literal. Call it with values of your choice.

---

## Part 2 — getElementById

Given this HTML already in your `<body>`:
```html
<h1 id="title">JavaScript is awesome<span style="display:none;"> — hidden text</span></h1>
<h2 id="subtitle"></h2>
```

4. Select `#title` using `getElementById` and log the element with `console.dir`.
5. Set the `innerText` of `#subtitle` to the `innerText` of `#title`. What do you notice about the hidden span text — does it appear or not? Add a comment in your code explaining why.
6. Set the `innerHTML` of `#subtitle` to the `innerHTML` of `#title`. What is different now?
7. Add the following styles to `#subtitle` using JavaScript (not CSS):
   - background color: `lightblue`
   - left border: `4px solid orange`

---

## Part 3 — getElementsByClassName & getElementsByTagName

Given this HTML:
```html
<ul>
  <li class="item">HTML</li>
  <li class="item">CSS</li>
  <li class="item">JavaScript</li>
  <li class="item">React</li>
</ul>
```

8. Select all elements with class `item` using `getElementsByClassName`. Log the collection — is it an array? How many items are in it?
9. Using a `for` loop with an index, set the text color of **every** item to `darkblue`.
10. Using the same loop, add a `2px solid gray` border **only** to the item at index 1 (CSS).
11. Replace the content of the last `<li>` with a link: `<a href="https://react.dev" target="_blank">React Docs</a>` using `innerHTML`.
12. Select all `<li>` elements using `getElementsByTagName` and use a `for...of` loop to set the background color of each one to `lightyellow`.

---

## Part 4 — Event Object & addEventListener

Given this HTML:
```html
<form>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username">
  </div>
  <input type="button" value="Submit" id="submit-btn">
</form>
```

13. Write a function `handleClick` that logs the string `"Button was clicked!"` to the console. Attach it to the button using `addEventListener` with the `"click"` event — **not** using the `onclick` attribute.
14. Change the event to `"mouseenter"`. What is the difference in behavior between `"click"` and `"mouseenter"`?  Add a short comment in your code explaining the difference.
15. Inside `handleClick`, read the value from the `#username` input and log: `"Hello, <username>!"`. Use `getElementById` to get the input.
16. **Bonus:** Add a second event listener to the button for `"mouseleave"` that changes the button's background color to `coral` when the mouse leaves it.

---

## Submission
- One `index.html` file with all 4 parts.
- Make sure there are **no errors** in the browser console when the page loads.
