import * as z from "zod";

const editCustomFieldsSchema = z.object({
    customFields: z.array(
        z.object({
            name: z.string().min(1, "Name is a required field"),
            type: z.enum(["string", "number", "boolean"]),
        })
    ),
});

export type EditCustomFieldsI = z.infer<typeof editCustomFieldsSchema>;
export default editCustomFieldsSchema;
