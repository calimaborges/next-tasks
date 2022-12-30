import midOrder from "./mid-order";

test("deve obter valor no meio de a e b", () => {
  const a = "a";
  const b = "b";
  const middle = midOrder(a, b);
  expect(middle).toBe("am");
});