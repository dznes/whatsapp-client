// import { FastifyRequest, FastifyReply } from 'fastify'
// import { z } from 'zod'
// import { prisma } from '@/lib/prisma'
//
// const bodySchema = z.object({
//     object: z.string(),
//     entry: z.array(
//       z.object({
//         changes: z.array(
//           z.object({
//             value: z.object({
//               messaging_product: z.string(),
//               messages: z.array(
//                 z.object({
//                   from: z.string(),
//                   id: z.string(),
//                   text: z.object({
//                     body: z.string(),
//                   }),
//                   type: z.string(),
//                 }),
//               ),
//               metadata: z.object({
//                 display_phone_number: z.string(),
//                 phone_number_id: z.string(),
//               }),
//               contacts: z.array(
//                 z.object({
//                   profile: z.object({
//                     name: z.string(),
//                   }),
//                   wa_id: z.string(),
//                 }),
//               ),
//               statuses: z.array(
//                 z.object({
//                   status: z.string().optional(),
//                 }).optional(),
//               ).optional(),
//             }),
//           }),
//         ),
//       }),
//     ),
//   });
//
// export async function CreateWebhookEvent(
//   request: FastifyRequest,
//   reply: FastifyReply,
// ) {
//     const body_param = bodySchema.parse(request.body);
//     console.log(JSON.stringify(body_param));
//
//     if (body_param.object) {
//       if (
//         body_param.entry &&
//         body_param.entry[0].changes &&
//         body_param.entry[0].changes[0].value.messages &&
//         body_param.entry[0].changes[0].value.messages[0]
//       ) {
//         const messaging_product = body_param.entry[0].changes[0].value.messaging_product;
//         const recipient_number = body_param.entry[0].changes[0].value.metadata.display_phone_number;
//         const name = body_param.entry[0].changes[0].value.contacts[0].profile.name
//         const wa_id = body_param.entry[0].changes[0].value.contacts[0].wa_id
//         const platform_message_id = body_param.entry[0].changes[0].value.messages[0].id;
//         const from = body_param.entry[0].changes[0].value.messages[0].from;
//         const content = body_param.entry[0].changes[0].value.messages[0].text.body;
//         const type = body_param.entry[0].changes[0].value.messages[0].type;
//
//         const status = body_param.entry[0].changes[0].value.statuses?.[0]?.status ?? 'sent'
//         console.log(body_param.entry[0].changes[0]);
//
//         const user = await prisma.user.findUnique({
//             where: {
//               number: from,
//             },
//         })
//
//         if(!user) {
//           await prisma.user.create({
//             data: {
//                 number: from,
//                 name,
//                 wa_id,
//             },
//           });
//         }
//
//         const messageId = await prisma.message.findUnique({
//           where: {
//             platform_message_id,
//           },
//         })
//
//         if(messageId) {
//           await prisma.message.update({
//             where: {
//               platform_message_id,
//             },
//             data: {
//               content,
//               status,
//             },
//
//           })
//         } else {
//           await prisma.message.create({
//             data: {
//                 messaging_product,
//                 platform_message_id,
//                 recipient_number,
//                 type,
//                 content,
//                 user: {
//                     connect: {
//                         number: from,
//                     },
//                 },
//                 status,
//             },
//           });
//         }
//
//
//         reply.code(200).send();
//       } else {
//         reply.code(404).send();
//       }
//     }
// }
