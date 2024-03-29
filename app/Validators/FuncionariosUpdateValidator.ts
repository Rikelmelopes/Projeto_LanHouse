import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class FuncionariosUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    cpf: schema.string.optional([
      rules.maxLength(14),
      rules.minLength(11),
      rules.unique({ table: "funcionarios", column: "cpf" }),
      //rules.regex(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/),
    ]),
    salario: schema.number.optional(),
    nome: schema.string.optional([rules.alpha({ allow: ["space"] })]),
    telefone: schema.string.optional([
      rules.maxLength(14),
      rules.minLength(11),
      rules.unique({ table: "funcionarios", column: "telefone" }),
      //rules.regex(/^([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/),
    ]),
    endereco: schema.string.optional([rules.maxLength(50)]),
    email: schema.string.optional([
      rules.email(),
      rules.unique({ table: "funcionarios", column: "email" }),
    ]),
    dataNascimento: schema.date.optional(),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    unique: "{{ field }} já cadastrado",
    maxLength:
      "o número máximo de caractéres do campo {{ field }} é de {{ options.maxLength }}",
    minLength:
      "o número máximo de caractéres do campo {{ field }} é de {{ options.minLength }}",
    required: "o campo {{ field }} é obrigatório",
  };
}
