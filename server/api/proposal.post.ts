import { supabaseClient } from "~~/server/lib/supabase";
import { ProposalSchema } from "~~/schemas/proposal";
import { hubspotClient } from "~~/server/lib/hubspot";

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

  const { name, email, phone, business } = parsedProposal;

  try {
    await hubspotClient.crm.contacts.basicApi.create({
      associations: [],
      properties: {
        firstname: name,
        email,
        phone,
        company: business,
        event_name: "Website",
        lifecyclestage: "lead",
        hs_lead_status: "NEW",
      },
    });
  } catch {
    throw createError({
      message:
        "Unknown error. Try contacting us via email info@traffic-dojo.com",
    });
  }
});
