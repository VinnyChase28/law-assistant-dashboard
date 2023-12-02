import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const companyRouter = createTRPCRouter({
  getUserCompany: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("UNAUTHORIZED");
    }

    const userWithCompany = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!userWithCompany || !userWithCompany.company) {
      throw new Error("Company not found for user");
    }

    return userWithCompany.company;
  }),
});
