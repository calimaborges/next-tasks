import nextOrder from "./next-order";

test("premissa é que ordem será correta", () => {
  const desordenada = ["za", "a", "az", "b", "c", "ba"];
  const ordenada = ["a", "az", "b", "ba", "c", "za"];
  expect(desordenada.sort()).toEqual(ordenada);
});

test("deve obter o primeiro item da ordem", () => {
  const next = nextOrder();
  expect(next).toBe("a");
});

test("deve obter próximo item com base no item informado", () => {
  const next = nextOrder("a");
  expect(next).toBe("b");
});

test("depois da segunda letra deve incrementar string", () => {
  const next = nextOrder("z");
  expect(next).toBe("za");
});

test("depois da terceira letra deve incrementar string", () => {
  const next = nextOrder("az");
  expect(next).toBe("aza");
});

test("verifica premissa com função de ordenar", () => {
  const lista = [];
  let curr;
  for (let i = 0; i < 100; ++i) lista.push(nextOrder(curr));
  expect(lista).toBe(lista.sort());
});
