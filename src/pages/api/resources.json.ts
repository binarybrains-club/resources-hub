import { type CollectionEntry, getCollection } from "astro:content";
import type { APIContext } from "astro";
import { z } from "astro/zod";
import { type ApiResponse } from "@/schema/api-response.ts";
import { err, ok, ResultAsync } from "neverthrow";
import { StatusCodes } from "@egamagz/statusx";

const ResourceFilterSchema = z.object({
  tags: z.string().array().optional(),
  title: z.string().optional(),
});

export async function GET({ url }: APIContext) {
  const tags = url.searchParams.getAll("tags");
  const title = url.searchParams.get("title");
  const filterData = {
    tags: tags.length > 0 ? tags : undefined,
    title: title || undefined,
  };

  const parseResult = ResourceFilterSchema.safeParse(filterData);
  const filterResult = parseResult.success
    ? ok(parseResult.data)
    : err(parseResult.error.message);

  if (filterResult.isErr()) {
    return new Response(
      JSON.stringify(
        {
          error: "invalid_request_parameters",
          message: filterResult.error,
        } satisfies ApiResponse,
      ),
      { status: StatusCodes.BadRequest },
    );
  }

  const resourcesResult = await ResultAsync.fromPromise(
    getCollection("resources"),
    (error) => {
      console.error("Error fetching resources:", error);
      return "internal_server_error";
    },
  );

  if (resourcesResult.isErr()) {
    return new Response(
      JSON.stringify(
        {
          error: "internal_server_error",
          message: "Failed to fetch resources",
        } satisfies ApiResponse,
      ),
      { status: StatusCodes.InternalServerError },
    );
  }

  const resources = resourcesResult.value as CollectionEntry<"resources">[];

  const filteredResources = resources.filter((resource) => {
    const matchesTags = filterResult.value.tags
      ? filterResult.value.tags.some((tag: string) =>
        resource.data.tags.includes(tag)
      )
      : true;

    const matchesTitle = filterResult.value.title
      ? resource.data.title.toLowerCase().includes(
        filterResult.value.title.toLowerCase(),
      )
      : true;

    return matchesTags && matchesTitle;
  });

  return new Response(
    JSON.stringify(
      {
        message: "Resources fetched successfully",
        data: filteredResources,
      } satisfies ApiResponse<CollectionEntry<"resources">[]>,
    ),
    { status: StatusCodes.OK },
  );
}
