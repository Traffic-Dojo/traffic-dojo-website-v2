import { supabaseClient } from "~~/server/lib/supabase";
import { ProposalSchema } from "~~/schemas/proposal";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data: parsedProposal, error: parsingProposalError } =
    ProposalSchema.safeParse(body);

  if (parsingProposalError) {
    console.log(parsingProposalError);

    throw createError({
      message: "Invalid proposal information",
      statusCode: 400,
    });
  }

  const { error } = await supabaseClient.from("clients").insert(parsedProposal);

  if (error) {
    throw createError({
      message: error.message,
      statusCode: 400,
    });
  }
});
