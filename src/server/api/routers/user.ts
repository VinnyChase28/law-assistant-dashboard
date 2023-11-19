import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const userRouter = createTRPCRouter({
  handleFirstUserSignIn: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check the number of users in the database
      const userCount = await ctx.db.user.count();

      if (userCount === 0) {
        // This is the first user, assign them as ADMIN and create a default company
        let adminRole = await ctx.db.role.findFirst({
          where: { name: "ADMIN" },
        });

        // If the ADMIN role doesn't exist, create it
        if (!adminRole) {
          adminRole = await ctx.db.role.create({
            data: { name: "ADMIN" },
          });
        }

        // Create a new company
        const newCompany = await ctx.db.company.create({
          data: { name: "Default Company" },
        });

        // Update the user with the ADMIN role and the new company
        return await ctx.db.user.update({
          where: { id: input.userId },
          data: {
            roleId: adminRole.id,
            companyId: newCompany.id,
          },
        });
      } else {
        // For users who are not the first, additional logic can go here
        // For example, assigning them a default role or handling other sign-in processes
      }

      return null; // Return null or appropriate response for users who are not the first
    }),
});
