import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from '../../utils/posts.ts'
import { CSS } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { Button } from "../../islands/Button.tsx";

export const handler: Handlers = {
    async GET(request, context) {
        const {id} = context.params
        const post = await loadPost(id)
        console.log(post)
        return context.render({post});
    },
}

export default function PagePost(props: PageProps) {
    console.log(props)
    const {post} = props.data || {};

    return (
        <article class="p-4">
            <h1 class="text-2xl font-bold">{post.title}</h1>
            <time>{Intl.DateTimeFormat('es').format(post.date)}</time>
            <style dangerouslySetInnerHTML={{__html: CSS}} />
            <div 
                class="markdown-body" 
                dangerouslySetInnerHTML={{__html: post.body}} />
        </article>
    )
}