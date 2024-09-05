import type {PrismicPlugin} from "@prismicio/vue";
import type {HeaderDocument} from "~/prismicio-types";
import type {PrismicDocumentWithoutUID} from "@prismicio/types";

export const useSocialShareMedia = () => {
    const prismic: PrismicPlugin = usePrismic();
    return useAsyncData(
        '$shareSocialMedia',
        async (): Promise<PrismicDocumentWithoutUID> => await prismic.client.getSingle<HeaderDocument>('header', {
            lang: 'fr-fr',
            fetch: 'my.header.share_social_media',
            filters: [
                prismic.filter.at('my.header.share_social_media.display_social_network', true),
                // prismic.filter.at('my.header.share_social_media.display_social_network', 'Affiché')
            ]
        })
    ).data.value?.data.share_social_media;
}
