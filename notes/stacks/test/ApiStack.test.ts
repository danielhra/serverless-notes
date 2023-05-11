import {it} from "vitest";
import {initProject} from "sst/project";
import {App, getStack} from "sst/constructs";
import {StorageStack} from "../StorageStack";
import {ApiStack} from "../ApiStack";
import {Template} from "aws-cdk-lib/assertions";

it("Creates api stack", async () => {
    //Given
    await initProject({});
    const app = new App({mode: "deploy"});

    //When
    app.stack(StorageStack).stack(ApiStack);

    //Then
    const template: Template = Template.fromStack(getStack(ApiStack));

    template.hasResourceProperties("AWS::Lambda::Function", {
        Runtime: "nodejs16.x"
    });

})