import { LightningElement, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { graphql, gql } from "lightning/uiGraphQLApi";

// eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unresolved-parent-class-reference
export default class SjAnimalRelatedAssessmentCmp extends NavigationMixin(
  LightningElement,
) {
  @api recordId;

  /*
    There is a currently Known Issue {@link https://issues.salesforce.com/issue/a028c00000xGGwE/graphql-query-fails-prefetch-with-an-unknown-field-warning} with GraphQL wire adapters where this will cause the component to fail to load offline.   
    There is a workaround that can be implemented in this Knowledge Article {@link https://help.salesforce.com/s/articleView?language=en_US&id=000396405&type=1}.
    As of Spring '24 release the issue has been addressed.
  */
  get animalQuery() {
    return !this.recordId
      ? undefined
      : gql`
          query animalWithRelatedAssessments($recordId: ID) {
            uiapi {
              query {
                animalshelters__Animal__c (where: { Id: { eq: $recordId } }) {
                    edges {
                        node {
                            Id
                            Name {
                                value
                            }
                            animalshelters__Assessments__r {
                                edges {
                                    node {
                                        Id
                                        animalshelters__Assessment_Type__c {
                                            value
                                        }
                                        Name {
                                            value
                                        }
                                    }
                                }
                                totalCount
                            }
                        }
                    }
                }
              }
            }
          }
        `;
  }

  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-wire-adapter-of-resource-cannot-be-primed
  @wire(graphql, {
    query: "$animalQuery",
    variables: "$graphqlVariables",
    operationName: "animalWithRelatedAssessments",
  })
  graphqlResult({ data /* errors */ }) {
    this.assessments = null;
    const animals = data?.uiapi?.query?.animalshelters__Animal__c?.edges;
    if (animals && animals[0]) {
      this.assessments = animals[0].node.animalshelters__Assessments__r.edges.map((e) => e.node);
    }
  }
  assessments;

  get graphqlVariables() {
    return {
      recordId: this.recordId,
    };
  }

  assessmentClick(event) {
    const { id } = event.currentTarget.dataset;
    this[NavigationMixin.Navigate]({
      type: "standard__quickAction",
      attributes: {
        actionName: "animalshelters__Assessments__r.view",
      },
      state: {
        recordId: id,
        objectApiName: "animalshelters__Assessments__r",
      },
    });
  }
}
