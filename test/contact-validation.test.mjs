// Browser-side contact form rules (src/sections/contact/validation.js).
import assert from "node:assert/strict";
import { test } from "node:test";
import { required, validateEmail, validateMessage } from "../src/sections/contact/validation.js";

const v = (value) => ({ value });

test("required: empty, whitespace and over-length fail; normal text passes", () => {
    const name = required("First name", 5);
    assert.equal(name(v("")), "First name is required.");
    assert.equal(name(v("   ")), "First name is required.");
    assert.match(name(v("abcdef")), /5 characters or fewer/);
    assert.equal(name(v(" Ada ")), undefined);
});

test("validateEmail", () => {
    assert.equal(validateEmail(v("")), "Email is required.");
    assert.equal(validateEmail(v("ada@example")), "Enter a valid email address.");
    assert.equal(validateEmail(v("ada @example.com")), "Enter a valid email address.");
    assert.match(validateEmail(v(`${"a".repeat(250)}@x.com`)), /254 characters/);
    assert.equal(validateEmail(v(" ada@example.com ")), undefined);
});

test("validateMessage", () => {
    assert.equal(validateMessage(v("")), "Message is required.");
    assert.match(validateMessage(v("too short")), /few more details/);
    assert.match(validateMessage(v("x".repeat(5001))), /5000 characters/);
    assert.equal(validateMessage(v("Long enough message.")), undefined);
});
