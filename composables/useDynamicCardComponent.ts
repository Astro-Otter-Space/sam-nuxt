import { defineAsyncComponent } from "vue";

export function useDynamicCardComponent(): {
  getComponent: (dataType: string) => Promise<Component | null> | undefined;
} {
  interface IComponentMap {
    [dataType: string]: string;
  }

  const components: IComponentMap = {
    page_thematique: "ThematicCard",
    page_article: "ArticleCard",
    event: "EventCard",
  };

  const importedComponentPromise = shallowRef<Promise<Component | null>>();

  function getComponent(
    dataType: string,
  ): Promise<Component | null> | undefined {
    if (!importedComponentPromise.value) {
      const componentName = components[dataType];
      if (!componentName) {
        throw new Error(`Component not found for data type: ${dataType}`);
      }
      importedComponentPromise.value = defineAsyncComponent(async () => {
        const component = await import(
          `@/components/content/${componentName}.vue`
        );
        return component.default || component;
      });
    }

    return importedComponentPromise.value;
  }

  return {
    getComponent,
  };
}
