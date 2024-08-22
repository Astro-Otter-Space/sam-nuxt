import {type LinkResolverFunction} from '@prismicio/client';
import type {FilledContentRelationshipField} from "@prismicio/client/src/types/value/contentRelationship";

const linkResolver: LinkResolverFunction = (document: FilledContentRelationshipField): string|null => {

    if ('homepage' === document.type) {
        return "/"
    }

    if ('page_thematique' === document.type) {
        const thematicUid = document.uid;
        return `/${thematicUid}`;
    }

    // if ('page_article' === document.type) {
    //     return `/${thematicUid}/${document.uid}`;
    // }

    if ('events' === document.type) {
        return `/agenda`;
    }

    if ('event' === document.type) {
        return `/agenda/${document.uid}`;
    }

    return null
}

export default linkResolver;