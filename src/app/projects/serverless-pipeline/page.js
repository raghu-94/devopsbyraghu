"use client";

import { useState } from "react";
import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, ErrorCard } from "@/components/guide/GuideComponents";

export default function ServerlessPipelineProject() {
  // Environment variables state
  const [vars, setVars] = useState({
    awsAccountId: "123456789012",
    awsRegion: "us-east-1",
    bucketName: "my-unique-startup-bucket-123"
  });

  const [appliedVars, setAppliedVars] = useState({ ...vars });
  const [applyButtonText, setApplyButtonText] = useState("Apply to Code Blocks");
  const [applyButtonColor, setApplyButtonColor] = useState("var(--g-accent)");

  // Chaos engine state
  const [chaosScenario, setChaosScenario] = useState(null);
  const [showChaosSolution, setShowChaosSolution] = useState(false);

  const navGroups = [
    {
      title: "Project Intro",
      items: [
        { id: "overview", title: "1. Architecture & Config" }
      ]
    },
    {
      title: "Execution Stages",
      items: [
        { id: "stage1", title: "2. Python App Source Code" },
        { id: "stage2", title: "3. S3, SQS & DynamoDB IaC" },
        { id: "stage3", title: "4. IAM Policies & Lambda" }
      ]
    },
    {
      title: "Troubleshooting",
      items: [
        { id: "errors", title: "5. Real-World Debugging" },
        { id: "chaos", title: "🔥 Test Your Knowledge" },
        { id: "destroy", title: "6. 🗑️ Destroy Resources" }
      ]
    },
    {
      title: "Interview Prep",
      items: [
        { id: "interview", title: "🎙️ Interview Q&A" }
      ]
    }
  ];

  const handleVarChange = (e) => {
    const { name, value } = e.target;
    setVars(prev => ({ ...prev, [name]: value }));
  };

  const applyVariables = () => {
    setAppliedVars({ ...vars });
    setApplyButtonText("Applied!");
    setApplyButtonColor("var(--g-green)");
    setTimeout(() => {
      setApplyButtonText("Apply to Code Blocks");
      setApplyButtonColor("var(--g-accent)");
    }, 2000);
  };

  // Chaos Engine data
  const chaosScenarios = [
    {
      title: "Scenario 1: The Principle of Least Privilege",
      symptom: "You upload an image to S3. Nothing happens. You check CloudWatch Logs and see: 'AccessDeniedException: User is not authorized to perform: dynamodb:PutItem'.",
      command: "# Use AWS CLI to delete the inline policy attached to the Lambda IAM Role\naws iam delete-role-policy --role-name serverless_lambda_role --policy-name serverless_lambda_policy",
      explanation: "Someone deleted the IAM Policy granting your Lambda function access to DynamoDB. The Lambda is firing correctly from the SQS event, but it is blocked from writing to the database. Since we use Terraform, the fix is literally just typing 'terraform apply' again to re-create the missing policy.",
      fixCommand: "terraform apply --auto-approve"
    },
    {
      title: "Scenario 2: The SQS Disconnect",
      symptom: "You upload an image to S3. The image goes into the bucket, but the Lambda never fires. CloudWatch has no new logs.",
      command: `# Delete the S3 bucket notification configuration\naws s3api put-bucket-notification-configuration --bucket ${appliedVars.bucketName} --notification-configuration "{}"`,
      explanation: "The bridge between S3 and SQS has been severed. S3 is no longer sending 'ObjectCreated' events to your queue, so the Lambda function is never waking up. Again, because this was defined in aws_s3_bucket_notification in our Terraform, applying the state instantly fixes the manual drift.",
      fixCommand: "terraform apply --auto-approve"
    }
  ];

  const generateChaos = () => {
    const randomIdx = Math.floor(Math.random() * chaosScenarios.length);
    setChaosScenario(chaosScenarios[randomIdx]);
    setShowChaosSolution(false);
  };

  return (
    <GuideWrapper 
      title="Project 3: AWS Serverless Pipeline" 
      subtitle="Architect an event-driven serverless workflow to process objects natively in AWS."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>The AWS Native Serverless Pipeline</h2>
                <p className="guide-subtitle">
                  GitHub Repo Name: <code style={{ color: "var(--g-accent)", padding: "4px 8px", backgroundColor: "var(--g-surface)", borderRadius: "4px", border: "1px solid var(--g-border)" }}>aws-serverless-image-processor</code>
                </p>

                <TipBox>
                  <strong>🎯 The Scenario (Use this in interviews):</strong><br />
                  &quot;Our data team had a nightly batch process that resized images. It ran on a dedicated EC2 instance that sat idle 90% of the day, wasting money. I re-architected it using AWS Native Serverless. Now, when an image is uploaded to S3, an event is fired to an SQS queue. An AWS Lambda function automatically wakes up, processes the image, writes the metadata to DynamoDB, and shuts down. We only pay for the exact milliseconds the code runs.&quot;
                </TipBox>

                <h3>💰 AWS Cost Breakdown</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--g-text-muted)", marginBottom: "12px" }}>
                  <em>Disclaimer: AWS pricing varies by region. The beauty of Serverless is that you <strong>only pay when it runs</strong>. There are no idle costs. This entire architecture falls comfortably inside the AWS Free Tier.</em>
                </p>

                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px", fontSize: "0.95rem" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--g-sidebar-bg)", borderBottom: "1px solid var(--g-border)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>AWS Resource</th>
                      <th style={{ padding: "12px" }}>Type / Tier</th>
                      <th style={{ padding: "12px" }}>Est. Hourly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>AWS Lambda</td>
                      <td style={{ padding: "12px" }}>Compute (Pay per invocation)</td>
                      <td style={{ padding: "12px" }}>$0.00 (Free Tier: 1M req/mo)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Amazon SQS</td>
                      <td style={{ padding: "12px" }}>Message Queue</td>
                      <td style={{ padding: "12px" }}>$0.00 (Free Tier: 1M req/mo)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Amazon DynamoDB</td>
                      <td style={{ padding: "12px" }}>NoSQL Database</td>
                      <td style={{ padding: "12px" }}>$0.00 (Free Tier: 25GB)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Amazon S3</td>
                      <td style={{ padding: "12px" }}>Object Storage</td>
                      <td style={{ padding: "12px" }}>$0.00 (Free Tier: 5GB)</td>
                    </tr>
                    <tr style={{ backgroundColor: "var(--g-accent-glow)" }}>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "var(--g-accent)" }}>Grand Total (for 1 hour)</td>
                      <td style={{ padding: "12px" }}></td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "var(--g-accent)" }}>$0.00 (Effectively Free)</td>
                    </tr>
                  </tbody>
                </table>

                <p>Fill out the variables below so the Terraform and Python code will work perfectly for your AWS Account.</p>

                <div className="var-config-box" style={configBoxStyle}>
                  <h4 style={{ margin: "0 0 16px 0", color: "var(--g-text-bright)" }}>⚙️ Your Environment Variables</h4>
                  
                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>AWS Account ID</label>
                    <input 
                      type="text" 
                      name="awsAccountId" 
                      value={vars.awsAccountId} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>

                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>AWS Region</label>
                    <input 
                      type="text" 
                      name="awsRegion" 
                      value={vars.awsRegion} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>
                  
                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>S3 Bucket Name</label>
                    <input 
                      type="text" 
                      name="bucketName" 
                      value={vars.bucketName} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>

                  <button 
                    onClick={applyVariables}
                    style={{
                      backgroundColor: applyButtonColor,
                      color: "#000000",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {applyButtonText}
                  </button>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-config" />
                      <label htmlFor="serverless-config">Configured variables and applied them to code blocks</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage1":
            return (
              <div>
                <h2>Stage 1: The Python Application</h2>
                <p className="guide-subtitle">The code that runs inside AWS Lambda.</p>

                <p>AWS Lambda supports many languages, but Python is the industry standard for cloud automation. We will use the <code>boto3</code> library to read the SQS message and write metadata into our DynamoDB database.</p>

                <CodeBlock 
                  title="lambda_code/app.py"
                  code={`import json
import boto3
import os
from datetime import datetime

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE', 'ImageMetadataTable')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    This function is triggered automatically by SQS.
    The 'event' parameter contains the SQS message payload.
    """
    print("Received event: " + json.dumps(event))
    
    for record in event['Records']:
        # Extract the SQS message body (which contains the S3 event details)
        payload = json.loads(record['body'])
        
        # If this is a test message from S3, skip it
        if 'Event' in payload and payload['Event'] == 's3:TestEvent':
            continue
            
        for s3_event in payload.get('Records', []):
            bucket_name = s3_event['s3']['bucket']['name']
            file_name = s3_event['s3']['object']['key']
            file_size = s3_event['s3']['object']['size']
            
            print(f"Processing uploaded file: {file_name} from bucket: {bucket_name}")
            
            # Write the metadata to DynamoDB
            try:
                response = table.put_item(
                    Item={
                        'FileName': file_name,
                        'BucketName': bucket_name,
                        'FileSize': file_size,
                        'UploadTime': str(datetime.now())
                    }
                )
                print(f"Successfully saved {file_name} metadata to DynamoDB.")
            except Exception as e:
                print(f"Error saving to DynamoDB: {e}")
                raise e

    return {
        'statusCode': 200,
        'body': json.dumps('Processing complete!')
    }`}
                />

                <p>This code will be zipped and uploaded to AWS by Terraform in the next steps.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-app-py" />
                      <label htmlFor="serverless-app-py">Created lambda_code/app.py and understand the event handler</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage2":
            return (
              <div>
                <h2>Stage 2: Infrastructure as Code</h2>
                <p className="guide-subtitle">Provisioning the Serverless components using Terraform.</p>

                <p>We will write Terraform to create the S3 Bucket, the SQS Queue, and the DynamoDB table.</p>

                <CodeBlock 
                  title="main.tf"
                  code={`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "${appliedVars.awsRegion}"
}

# 1. The DynamoDB Table
resource "aws_dynamodb_table" "metadata_table" {
  name           = "ImageMetadataTable"
  billing_mode   = "PAY_PER_REQUEST" # Serverless billing!
  hash_key       = "FileName"

  attribute {
    name = "FileName"
    type = "S"
  }
}

# 2. The SQS Queue
resource "aws_sqs_queue" "image_queue" {
  name = "image-processing-queue"
  
  # To allow S3 to send messages to this queue, we need a Queue Policy
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "sqs:SendMessage"
        Resource = "arn:aws:sqs:${appliedVars.awsRegion}:${appliedVars.awsAccountId}:image-processing-queue"
        Condition = {
          ArnEquals = {
            "aws:SourceArn" = "arn:aws:s3:::${appliedVars.bucketName}"
          }
        }
      }
    ]
  })
}

# 3. The S3 Bucket
resource "aws_s3_bucket" "image_bucket" {
  bucket        = "${appliedVars.bucketName}"
  force_destroy = true
}

# 4. Connect S3 to SQS
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.image_bucket.id

  queue {
    queue_arn     = aws_sqs_queue.image_queue.arn
    events        = ["s3:ObjectCreated:*"]
  }
}`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-main-tf" />
                      <label htmlFor="serverless-main-tf">Created main.tf with S3, SQS, and DynamoDB resources</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage3":
            return (
              <div>
                <h2>Stage 3: IAM & Lambda Deployment</h2>
                <p className="guide-subtitle">Granting least-privilege permissions and deploying the code.</p>

                <ConceptBox title="🎯 The Interview Answer:">
                  <p style={{ margin: 0 }}>
                    &quot;The hardest part of Serverless is IAM. I didn&apos;t just give the Lambda function &apos;AdministratorAccess&apos;. I wrote a strict IAM Role that only allowed the Lambda function to <code>sqs:ReceiveMessage</code> from our specific queue, and <code>dynamodb:PutItem</code> to our specific table. This ensures our cloud environment is secure from lateral movement.&quot;
                  </p>
                </ConceptBox>

                <h3>1. Zip the Python Code</h3>
                <p>Terraform needs a zip file to upload to AWS.</p>

                <CodeBlock 
                  title="lambda.tf"
                  code={`data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "lambda_code"
  output_path = "lambda_function.zip"
}`}
                />

                <h3>2. The IAM Role (Least Privilege)</h3>
                <p>Append this to <code>lambda.tf</code>. This gives the Lambda permission to read SQS, write DynamoDB, and log to CloudWatch.</p>

                <CodeBlock 
                  title="lambda.tf (continued)"
                  code={`resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "serverless_lambda_policy"
  role = aws_iam_role.lambda_exec.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = ["sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"]
        Resource = aws_sqs_queue.image_queue.arn
      },
      {
        Effect = "Allow"
        Action = ["dynamodb:PutItem"]
        Resource = aws_dynamodb_table.metadata_table.arn
      }
    ]
  })
}`}
                />

                <h3>3. Create the Lambda Function & Trigger</h3>
                <p>Append this to <code>lambda.tf</code>. We deploy the function, and configure SQS as the trigger.</p>

                <CodeBlock 
                  title="lambda.tf (continued)"
                  code={`resource "aws_lambda_function" "processor" {
  filename         = "lambda_function.zip"
  function_name    = "ImageProcessor"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "app.lambda_handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "python3.9"
  
  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.metadata_table.name
    }
  }
}

resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.image_queue.arn
  function_name    = aws_lambda_function.processor.arn
  batch_size       = 1
}`}
                />

                <h3>4. Deploy & Test!</h3>
                <CodeBlock 
                  title="VS Code Terminal"
                  code={`terraform init\nterraform apply --auto-approve`}
                />

                <p>
                  <strong>To test:</strong> Go to the AWS S3 Console, find your bucket (<code>{appliedVars.bucketName}</code>), and upload an image file. Then, check the <code>ImageMetadataTable</code> in DynamoDB. You will see a new metadata row appear!
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-lambda-tf" />
                      <label htmlFor="serverless-lambda-tf">Created lambda.tf with roles and mappings</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-deployed" />
                      <label htmlFor="serverless-deployed">Ran terraform apply and verified S3 upload triggers DynamoDB entry</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>Real-World Debugging</h2>
                <p className="guide-subtitle">CloudWatch logs are your best friend.</p>

                <h3>1. AccessDeniedException in DynamoDB</h3>
                <ErrorCard 
                  error="User: arn:aws:sts:... is not authorized to perform: dynamodb:PutItem"
                  meaning="You uploaded a file to S3, but nothing appeared in DynamoDB. CloudWatch logs show this error."
                  fix="The IAM Role attached to the Lambda function does not have permission to write to DynamoDB. Ensure the aws_iam_role_policy in your Terraform explicitly allows dynamodb:PutItem on the correct table ARN."
                />

                <h3>2. Lambda Timeout</h3>
                <ErrorCard 
                  error="Task timed out after 3.00 seconds"
                  meaning="The Lambda function fails to process large files before AWS kills the invocation."
                  fix="AWS Lambda functions have a default timeout of 3 seconds. In your aws_lambda_function Terraform resource, add timeout = 30 to give the script 30 seconds to finish."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-errors-read" />
                      <label htmlFor="serverless-errors-read">I understand DynamoDB authorization policies and execution timeout limits</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "chaos":
            return (
              <div>
                <h2>🔥 Test Your Knowledge (Chaos Engine)</h2>
                <p className="guide-subtitle">Cloud security is fragile. Break it and learn how to restore it.</p>

                <TipBox>
                  <strong>How it works:</strong> Click the button below to generate a random &quot;Chaos Scenario&quot;. Run the command to sabotage your Serverless pipeline, then read the explanation.
                </TipBox>

                <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
                  <button 
                    onClick={generateChaos}
                    style={{
                      backgroundColor: "var(--g-red)",
                      color: "#ffffff",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(248, 81, 73, 0.4)",
                      transition: "all 0.2s"
                    }}
                  >
                    💥 Generate Production Outage
                  </button>
                </div>

                {chaosScenario && (
                  <div className="chaos-card" style={{ display: "block", border: "1px solid rgba(248,81,73,0.3)", backgroundColor: "rgba(248,81,73,0.02)", padding: "24px", borderRadius: "8px", marginTop: "24px" }}>
                    <h3 style={{ color: "var(--g-red)", marginTop: 0, border: "none" }}>{chaosScenario.title}</h3>
                    <p><strong>🚨 The Symptom:</strong> {chaosScenario.symptom}</p>
                    
                    <p style={{ marginTop: "24px", marginBottom: "8px" }}><strong>Run this command in your terminal to cause the outage:</strong></p>
                    <CodeBlock title="WSL Terminal" code={chaosScenario.command} />
                    
                    <button 
                      onClick={() => setShowChaosSolution(!showChaosSolution)}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--g-border)",
                        color: "var(--g-text)",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "16px"
                      }}
                    >
                      {showChaosSolution ? "👀 Hide Solution" : "👀 I give up, reveal the fix"}
                    </button>
                    
                    {showChaosSolution && (
                      <div className="chaos-solution" style={{ display: "block", borderLeft: "4px solid var(--g-green)", backgroundColor: "var(--g-surface)", padding: "16px", marginTop: "16px", borderRadius: "0 8px 8px 0" }}>
                        <h4 style={{ color: "var(--g-green)", marginBottom: "12px", marginTop: 0 }}>✅ The Fix</h4>
                        <p>{chaosScenario.explanation}</p>
                        <CodeBlock title="WSL Terminal" code={chaosScenario.fixCommand} />
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-chaos-tested" />
                      <label htmlFor="serverless-chaos-tested">Tested both chaos scenarios and verified fixes</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy AWS Resources</h2>
                <p className="guide-subtitle">Leave no trace.</p>

                <p>Because we used Infrastructure as Code to build everything, destroying it is incredibly easy. No orphan resources will be left behind to cost you money.</p>

                <h3>The Golden Command</h3>
                <CodeBlock 
                  title="VS Code Terminal"
                  code="terraform destroy --auto-approve"
                />

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", margin: "0 0 16px 0" }}>🎓 Project 3 Complete!</h3>
                  <p style={{ fontSize: "1.1rem", color: "var(--g-text-bright)", margin: 0 }}>
                    You successfully architected a highly scalable, event-driven Serverless pipeline.<br />
                    You are ready to build production cloud systems.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="serverless-deleted" />
                      <label htmlFor="serverless-deleted">Ran terraform destroy and verified resources deleted in AWS Console</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "interview":
            return (
              <div>
                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "0 0 32px" }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--g-border), transparent)" }} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--g-text-muted)" }}>Interview Preparation</span>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--g-border), transparent)" }} />
                </div>

                <h2>🎙️ Interview Q&A: AWS Serverless Pipeline</h2>
                <p className="guide-subtitle">Serverless proves you understand cost optimization and decoupled architectures.</p>

                {[
                  {
                    q: "Q1. Why did you use SQS between S3 and Lambda? Why not trigger Lambda directly from S3?",
                    a: "Decoupling and fault tolerance. If 10,000 users upload an image to S3 at the exact same second, triggering Lambda directly might hit concurrency limits and drop requests. By putting an SQS Queue in the middle, the queue acts as a shock absorber. The messages wait safely in the queue, and Lambda pulls them at its own pace. No data is lost.",
                    highlight: "shock absorber"
                  },
                  {
                    q: "Q2. What is a Dead Letter Queue (DLQ) in SQS?",
                    a: "If a message in SQS is picked up by Lambda, but the Lambda function crashes (e.g., bad code), the message goes back to the queue. If it fails repeatedly, SQS will move that \"poison pill\" message into a Dead Letter Queue (DLQ). This prevents the bad message from clogging up the main queue forever, and allows engineers to manually inspect why it failed."
                  },
                  {
                    q: "Q3. What is \"Least Privilege\" in IAM, and how did you apply it to your Lambda function?",
                    a: "Least Privilege means giving an entity only the exact permissions it needs to do its job, and nothing more. I did not give Lambda \"AdministratorAccess\". I created a specific IAM Role that only allowed `sqs:ReceiveMessage` on one specific queue ARN, and `dynamodb:PutItem` on one specific table ARN. If the Lambda is hacked, the hacker cannot touch the rest of our AWS account."
                  },
                  {
                    q: "Q4. What is a \"Cold Start\" in AWS Lambda?",
                    a: "When a Lambda function hasn't been triggered in a while, AWS spins down the underlying container to save money. When a new request comes in, AWS has to provision a new container and load the Python runtime, which adds a few seconds of latency. This is called a Cold Start. To mitigate this for highly-sensitive APIs, you can use \"Provisioned Concurrency\" to keep containers warm."
                  },
                  {
                    q: "Q5. Why did you choose DynamoDB instead of an RDS MySQL database?",
                    a: "DynamoDB is a managed NoSQL database that perfectly fits serverless architectures. Unlike RDS, there are no persistent database connections to manage (which Lambda struggles with at high scale). It handles millions of requests per second effortlessly via HTTP APIs, and you only pay for the exact read/write operations you consume."
                  }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "var(--g-surface)", border: "1px solid var(--g-border)",
                    borderRadius: "12px", padding: "20px 24px", marginBottom: "16px"
                  }}>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--g-text-bright)", marginBottom: "12px", display: "flex", gap: "10px" }}>
                      <span style={{ color: "#ff9900" }}>{item.q.split('.')[0]}.</span>
                      <span>{item.q.split('.').slice(1).join('.')}</span>
                    </div>
                    <div style={{ color: "var(--g-text-muted)", fontSize: "0.88rem", paddingLeft: "36px", lineHeight: 1.7 }}>
                      <p><strong>Answer:</strong> {item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      }}
    </GuideWrapper>
  );
}

// Custom styles
const configBoxStyle = {
  backgroundColor: "var(--g-surface)",
  border: "1px solid var(--g-border)",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0"
};

const varRowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px"
};

const labelStyle = {
  width: "140px",
  fontWeight: "600",
  color: "var(--g-text-muted)",
  fontSize: "0.95rem"
};

const inputStyle = {
  flex: 1,
  maxWidth: "300px",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid var(--g-border)",
  backgroundColor: "#090c10",
  color: "#ffffff",
  outline: "none"
};
