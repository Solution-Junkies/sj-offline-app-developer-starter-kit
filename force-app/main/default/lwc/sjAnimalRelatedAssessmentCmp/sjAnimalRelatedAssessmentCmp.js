import { LightningElement, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { graphql, gql } from "lightning/uiGraphQLApi";

// eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unresolved-parent-class-reference
export default class SjAnimalRelatedAssessmentCmp extends NavigationMixin(LightningElement) {
  @api recordId;
  assessments;
  animals;
  totalCount;
  errors;
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
                Animal:animalshelters__Animal__c (where: { Id: { eq: $recordId } }) {
                  edges {
                    node {
                      Id
                      Name {
                        value
                      }
                      Assessment:animalshelters__Assessments__r {
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
  graphqlResult({ data,errors }) {
    if (data) {
      this.animals = data?.uiapi.query.Animal.edges;
      this.assessments = this.animals[0].node.Assessment.edges.map((e) => e.node);
      this.totalCount = this.animals[0].node.Assessment.totalCount;
      console.log("no of assessments" + JSON.stringify(this.totalCount))
    } else if (errors) {
      this.errors = errors;
    }
  }

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
        actionName: "relatedAssessments.view",
      },
      state: {
        recordId: id,
        objectApiName: "animalshelters__Assessments__r",
      },
    });
  }
}
