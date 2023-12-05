import React from 'react'
import styles from './JNFForm.module.scss'
import Util from './Util'
import {
  BTechBranchesCircuital,
  BTechBranchesNonCircuital,
  DualDegreeBranches,
  BArchBranches,
  MArchBranches,
  MBABranches,
  MScBranches,
  MTechBranchesCircuital,
  MTechBranchesNonCircuital,
} from '../../../utils/Data/eligibleBranchData'

export default function EligibleBatches({
  parentState,
  handleParentStateChange,
}: {
  parentState: any
  handleParentStateChange: React.Dispatch<any>
}) {
  return (
    <div className={styles.form_comp}>
      <div className={`${styles.center}`}>Select Eligible Branches for Recruitment</div>
      <div className={`${styles.row_1} ${styles.main_heading}`}>
        <div className={`${styles.col} ${styles.col_1}`}>Sr No.</div>
        <div className={`${styles.col} ${styles.width}`}>Programs offered</div>
        <div className={`${styles.col_3}`}>
          <div className={`${styles.row}`}>
            <div className={styles.col_3_1}>Specialisation</div>
            <div className={styles.col_3_2}>
              {' '}
              <div>Yes/No</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>1</div>
        <div className={styles.col}>B.Tech. / B.Arch</div>
        <div className={`${styles.col_3}`}>
          <div className={`${styles.row}`}>
            <div className={`${styles.branch_heading}`}>Circuital Branches</div>
          </div>
          {BTechBranchesCircuital.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
          <div className={`${styles.row}`}>
            <div className={`${styles.branch_heading}`}>Non-Circuital Branches</div>
          </div>
          {BTechBranchesNonCircuital.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}

          {BArchBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.even}`}>
        <div className={`${styles.col} ${styles.col_1}`}>2</div>
        <div className={styles.col}>Dual Degree (5-year course)</div>
        <div className={`${styles.col_3}`}>
          {DualDegreeBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>3</div>
        <div className={styles.col}>M.Tech/M.Arch (2-year course)</div>
        <div className={`${styles.col_3}`}>
          <div className={`${styles.row}`}>
            <div className={`${styles.branch_heading}`}>Circuital Branches</div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Computer Science & Engineering</div>
          </div>
          <div>
            {MTechBranchesCircuital.ComputerScienceEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Electronics & Communication Engineering</div>
          </div>
          <div>
            {MTechBranchesCircuital.ElectronicsCommunicationEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Electrical Engineering</div>
          </div>
          <div>
            {MTechBranchesCircuital.ElectricalEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.branch_heading}`}>Non-Circuital Branches</div>
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Civil Engineering</div>
          </div>
          <div>
            {MTechBranchesNonCircuital.CivilEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div>
            <div className={`${styles.dept_heading}`}>Chemical Engineering</div>
          </div>
          <div>
            {MTechBranchesNonCircuital.ChemicalEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Material Science & Engineering</div>
          </div>
          <div>
            {MTechBranchesNonCircuital.MaterialScienceEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Mechanical Engineering</div>
          </div>

          <div>
            {MTechBranchesNonCircuital.MechanicalEngineering.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>

          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Center for Energy Studies</div>
          </div>
          <div>
            {MTechBranchesNonCircuital.CenterforEnergyStudies.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.dept_heading}`}>Architecture</div>
          </div>

          <div>
            {MArchBranches.map((branch) => (
              <Util
                key={branch.fullName}
                branchName={branch.fullName}
                shortName={branch.shortName}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className={`${styles.row_1} ${styles.even}`}>
        <div className={`${styles.col} ${styles.col_1}`}>6</div>
        <div className={styles.col}>Master of Business Administration</div>

        <div>
          {MBABranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>
      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>7</div>
        <div className={styles.col}>M. Sc(2-year course)</div>

        <div>
          {MScBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div> */}
      {/* </div> */}

      <div className={`${styles.row_1} ${styles.even}`}>
        <div className={`${styles.col} ${styles.col_1}`}>4</div>
        <div className={styles.col}>MSc Cources</div>
        <div className={`${styles.col_3}`}>
          {MScBranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>

      <div className={`${styles.row_1} ${styles.odd}`}>
        <div className={`${styles.col} ${styles.col_1}`}>5</div>
        <div className={styles.col}>MBA Cources</div>
        <div className={`${styles.col_3}`}>
          {MBABranches.map((branch) => (
            <Util key={branch.fullName} branchName={branch.fullName} shortName={branch.shortName} />
          ))}
        </div>
      </div>
    </div>
  )
}
